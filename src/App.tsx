import { useEffect, useRef, useState } from 'react';
import { PracticalCard } from './components/PracticalCard';
import { fetchPracticals, fetchPracticalSourceCode } from './lib/supabase';
import type { PracticalSummary } from './types/practical';

/**
 * Copies text to clipboard using standard Clipboard API with an iframe-safe fallback.
 */
async function copyTextToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fallback below if Clipboard API is restricted inside an iframe
    }
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.top = '-9999px';
  textArea.style.left = '-9999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const successful = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!successful) {
    throw new Error('Clipboard copy failed');
  }
}

interface ToastNotification {
  message: string;
  isError: boolean;
}

export default function App() {
  const [practicals, setPracticals] = useState<PracticalSummary[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [copiedPractical, setCopiedPractical] = useState<string | null>(null);
  const [activeCopyingPractical, setActiveCopyingPractical] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const copyResetTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const isCopyingRef = useRef<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPracticals() {
      setIsLoading(true);
      setLoadError(null);
      try {
        const data = await fetchPracticals();
        if (isMounted) {
          setPracticals(data);
        }
      } catch {
        if (isMounted) {
          setLoadError('Unable to load practical programs.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPracticals();

    return () => {
      isMounted = false;
      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current);
      }
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string, isError = false) => {
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    setToast({ message, isError });
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  const handleCopyPractical = async (practicalNumber: string) => {
    // Prevent multiple rapid clicks from causing overlapping clipboard operations
    if (isCopyingRef.current) return;
    isCopyingRef.current = true;
    setActiveCopyingPractical(practicalNumber);

    try {
      const sourceCode = await fetchPracticalSourceCode(practicalNumber);
      await copyTextToClipboard(sourceCode);

      if (copyResetTimerRef.current) {
        window.clearTimeout(copyResetTimerRef.current);
      }

      setCopiedPractical(practicalNumber);
      showToast(`${practicalNumber} Code Copied!`, false);

      copyResetTimerRef.current = window.setTimeout(() => {
        setCopiedPractical((prev) => (prev === practicalNumber ? null : prev));
      }, 2000);
    } catch {
      showToast(`Failed to copy ${practicalNumber} code`, true);
    } finally {
      isCopyingRef.current = false;
      setActiveCopyingPractical(null);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0D1A2B] text-white px-5 py-7 sm:px-8 sm:py-10">
      <main className="max-w-[720px] mx-auto">
        <h1 className="text-[2.3rem] sm:text-[2.7rem] font-bold text-white tracking-normal leading-tight mb-6 sm:mb-7">
          Practical Programs
        </h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#16293F]/70 rounded-[16px] px-7 py-6 sm:px-8 sm:py-7 h-[176px] animate-pulse"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="bg-[#16293F] rounded-[16px] px-7 py-8 text-[#A9B9CC] text-[1.25rem]">
            {loadError}
          </div>
        ) : practicals.length === 0 ? (
          <div className="bg-[#16293F] rounded-[16px] px-7 py-8 text-[#A9B9CC] text-[1.25rem]">
            No practical programs available.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {practicals.map((practical) => (
              <PracticalCard
                key={practical.id || practical.practical_number}
                practical={practical}
                isCopied={copiedPractical === practical.practical_number}
                isCopying={activeCopyingPractical !== null}
                onCopy={handleCopyPractical}
              />
            ))}
          </div>
        )}
      </main>

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 right-5 z-50 rounded-[12px] px-4 py-2.5 text-[1.05rem] shadow-lg transition-opacity duration-150 ${
            toast.isError
              ? 'bg-[#3B1E2B] text-[#FCA5A5] border border-[#F87171]/30'
              : 'bg-[#1E334B] text-[#54B8F2] border border-[#54B8F2]/30'
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
