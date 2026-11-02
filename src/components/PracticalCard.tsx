import type { PracticalSummary } from '../types/practical';

interface PracticalCardProps {
  practical: PracticalSummary;
  isCopied: boolean;
  isCopying: boolean;
  onCopy: (practicalNumber: string) => void;
}

export function PracticalCard({
  practical,
  isCopied,
  isCopying,
  onCopy,
}: PracticalCardProps) {
  const handleClick = () => {
    if (isCopying) return;
    onCopy(practical.practical_number);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isCopying}
      aria-label={`Copy code for ${practical.practical_number} ${practical.practical_name}`}
      className="w-full h-full text-left bg-[#16293F] hover:bg-[#1B314B] active:scale-[0.995] transition-colors duration-150 rounded-[16px] px-7 py-6 sm:px-8 sm:py-7 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#54B8F2]/70 flex flex-col justify-between"
    >
      <div>
        <div className="text-[#54B8F2] text-[2.3rem] sm:text-[2.55rem] font-bold leading-[1.1] tracking-wide">
          {practical.practical_number}
        </div>

        <div className="text-white text-[1.5rem] sm:text-[1.7rem] font-normal leading-[1.28] mt-3.5 mb-5">
          {practical.practical_name}
        </div>
      </div>

      <div className="text-[#A9B9CC] text-[1.15rem] sm:text-[1.25rem] font-normal leading-none tracking-wide">
        {isCopied ? 'Copied ✓' : 'Copy Code →'}
      </div>
    </button>
  );
}
