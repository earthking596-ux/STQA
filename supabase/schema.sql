-- Supabase Database Schema & Seed for Practical Programs
-- Table: practicals

CREATE TABLE IF NOT EXISTS public.practicals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  practical_number TEXT UNIQUE NOT NULL,
  practical_name TEXT NOT NULL,
  source_code TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.practicals ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public SELECT access (read-only public website)
DROP POLICY IF EXISTS "Allow public select access on practicals" ON public.practicals;
CREATE POLICY "Allow public select access on practicals"
  ON public.practicals
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Seed Practical Programs (P01 to P09)
INSERT INTO public.practicals (practical_number, practical_name, display_order, source_code)
VALUES
(
  'P01',
  'Selenium IDE (4 Test Cases Suite)',
  1,
  $CODE$Practical No. 1
Aim: Install Selenium IDE; Write a test suite containing minimum 4 test cases for different formats.

Step 1: Install Mozilla Firefox if not installed.
Step 2: Open Firefox and type URL: https://addons.mozilla.org/en-US/firefox/addon/selenium-ide/
Step 3: Click on the "Add to Firefox" (Add Extension) button and restart Mozilla Firefox.
Step 4: Once Mozilla Firefox is turned on, click on the Puzzle Piece (Extensions) button at the top-right corner and open Selenium IDE.
Step 5: Click on "Create a new project", enter project name "STQA Pract1", and click "OK".
Step 6: Enter the Base URL: http://demo.guru99.com/test/newtours/ and toggle the Record button ON.
Step 7: In the "User Name" text box of Mercury Tours, type an invalid username "invalidUNN" and in the "Password" text box type "invalidPWD".
Step 8: Click on the "Sign-In" button, then toggle the Record button OFF in Selenium IDE to stop recording.
Step 9: Save the test case as "Invalid_login" and click the Playback button to execute the script.
Step 10: Now repeat this to record and run test cases for 3 other websites in the test suite:
  i. http://www.youtube.com (YouTube Case)
  ii. https://www.yahoo.in (Yahoo Case)
  iii. https://www.google.com (Google Case)$CODE$
),
(
  'P02',
  'Selenium IDE (Write 2 Test Cases)',
  2,
  $CODE$Practical No. 2
Aim: Write 2 test cases in Selenium IDE.

1. Checking Assert Title & Verify Title Commands:
Step 1: Open Mozilla Firefox and open Selenium IDE.
Step 2: Type Base URL: https://www.google.com/ and start recording.
Step 3: Search "selenium IDE" in the Google search bar and click the first link (Selenium HQ).
Step 4: Right-click on the page -> Selenium IDE -> Assert -> Title.
Step 5: Save the test case as "valid_assert_title".
Step 6: Create a new test case named "invalid_assert_title", repeat Steps 2 to 4, and change Target to "Selenese".
Step 7: Repeat the steps using Verify Title instead of Assert Title and save as "valid_verify_title" and "invalid_verify_title".

2. Checking Assert Text, Verify Text & Verify Element Present Commands:
Step 1: Create a new test named "valid_assert_text" with Base URL https://www.google.com/.
Step 2: Search "Selenium IDE", click the first site, highlight the heading "Selenium IDE", right-click -> Selenium IDE -> Assert -> Text, and save.
Step 3: Create "invalid_assert_text", repeat the steps, and type Value "Selenese" instead of "Selenium IDE".
Step 4: Repeat the steps using Verify Text command ("valid_verify_text" and "invalid_verify_text").
Step 5: Create "verify_element_present" and "invalid_verify_element_present" using right-click -> Selenium IDE -> Verify -> Element Present, save, and run the tests.$CODE$
),
(
  'P03',
  'Selenium Server (Java Script Demo)',
  3,
  $CODE$package PRAC03;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class P03 {

    public static void main(String[] args) throws InterruptedException {

        System.setProperty(
                "webdriver.gecko.driver",
                "C:/Users/admin/Desktop/STQA/REQUIRED FILES/geckodriver.exe"
        );

        WebDriver driver = new FirefoxDriver();

        driver.get("https://www.google.com");

        System.out.println("Title: " + driver.getTitle());

        Thread.sleep(5000);

        driver.quit();
    }
}$CODE$
),
(
  'P04',
  'Login Specific Web Page',
  4,
  $CODE$package PRAC04;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class P04 {

    public static void main(String[] args) throws InterruptedException {

        System.setProperty(
                "webdriver.gecko.driver",
                "C:/Users/admin/Desktop/STQA/REQUIRED FILES/CHROME DRIVER/geckodriver.exe"
        );

        WebDriver driver = new FirefoxDriver();

        driver.get("https://the-internet.herokuapp.com/login");

        driver.findElement(By.id("username"))
                .sendKeys("tomsmith");

        driver.findElement(By.id("password"))
                .sendKeys("SuperSecretPassword!");

        driver.findElement(By.className("radius")).click();

        Thread.sleep(3000);

        String result = driver.findElement(By.id("flash")).getText();

        if (result.contains("You logged into a secure area!")) {
            System.out.println("LOGIN SUCCESSFUL...");
        } else {
            System.out.println("LOGIN FAILED");
        }

        driver.quit();
    }
}$CODE$
),
(
  'P05',
  'Update 10 Student Records in Excel',
  5,
  $CODE$package PRAC05;

import java.io.File;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class P05 {

    public static void main(String[] args) throws Exception {

        Workbook wb = Workbook.getWorkbook(
                new File("C:/Users/admin/Desktop/STQA/PRACTICALS/INPUT5.xls")
        );

        Sheet s = wb.getSheet(0);

        WritableWorkbook wwb = Workbook.createWorkbook(
                new File("src/PRAC05/output.xls")
        );

        WritableSheet ws = wwb.createSheet("Result", 0);

        int rows = s.getRows();
        int cols = s.getColumns();

        String[][] a = new String[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {

                a[i][j] = s.getCell(j, i).getContents();

                Label cell = new Label(j, i, a[i][j]);
                ws.addCell(cell);
            }
        }

        int totalCol = cols;

        for (int j = 1; j < cols; j++) {
            if (a[0][j].trim().equalsIgnoreCase("TOTAL")) {
                totalCol = j;
                break;
            }
        }

        int resultCol = cols;

        Label header = new Label(resultCol, 0, "RESULT");
        ws.addCell(header);

        for (int i = 1; i < rows; i++) {

            boolean pass = true;

            for (int j = 1; j < totalCol; j++) {

                String value = a[i][j].trim();

                if (value.isEmpty()) {
                    pass = false;
                    break;
                }

                try {
                    int marks = Integer.parseInt(value);

                    if (marks <= 35) {
                        pass = false;
                        break;
                    }

                } catch (NumberFormatException e) {
                    pass = false;
                    break;
                }
            }

            String result = pass ? "PASS" : "FAIL";

            Label cell = new Label(resultCol, i, result);
            ws.addCell(cell);
        }

        wwb.write();
        wwb.close();
        wb.close();

        System.out.println("Records successfully updated");
    }
}$CODE$
),
(
  'P06',
  'Students Scored > 60 in Excel',
  6,
  $CODE$package PRAC06;

import java.io.File;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;

public class P06 {

    public static void main(String[] args) throws Exception {

        Workbook wb = Workbook.getWorkbook(
            new File("C:/Users/admin/Desktop/STQA/PRACTICALS/INPUT55.xls")
        );

        Sheet s = wb.getSheet(0);

        WritableWorkbook wwb = Workbook.createWorkbook(
            new File("C:/Users/admin/Desktop/STQA/PRACTICALS/OUTPUT55.xls")
        );

        WritableSheet ws = wwb.createSheet("Result", 0);

        int rows = s.getRows();
        int cols = s.getColumns();

        // Copy heading
        for (int j = 0; j < cols; j++) {
            Label cell = new Label(j, 0,
                s.getCell(j, 0).getContents());
            ws.addCell(cell);
        }

        int count = 0;
        int outRow = 1;

        // Check student records
        for (int i = 1; i < rows; i++) {

            boolean selected = false;

            for (int j = 2; j < cols; j++) {

                String value = s.getCell(j, i).getContents().trim();

                if (value.isEmpty()) {
                    continue;
                }

                int marks = Integer.parseInt(value);

                if (marks > 60) {
                    selected = true;
                    break;
                }
            }

            // Copy selected student
            if (selected) {

                for (int j = 0; j < cols; j++) {

                    String data = s.getCell(j, i).getContents();

                    Label cell = new Label(j, outRow, data);
                    ws.addCell(cell);
                }

                outRow++;
                count++;
            }
        }

        wwb.write();
        wwb.close();
        wb.close();

        System.out.println("Total students scored more than 60: " + count);
        System.out.println("Records successfully updated");
    }
}$CODE$
),
(
  'P07',
  'Total Objects / Links on Web Page',
  7,
  $CODE$package PRAC07;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class P07 {

    public static void main(String[] args) {

        System.setProperty(
                "webdriver.gecko.driver",
                "C:/Users/admin/Desktop/STQA/REQUIRED FILES/CHROME DRIVER/geckodriver.exe"
        );

        WebDriver driver = new FirefoxDriver();

        driver.get("https://www.google.com");

        List<WebElement> mylist =
                driver.findElements(By.xpath("//a"));

        System.out.println(
                "Number of links = " + mylist.size()
        );

        driver.quit();
    }
}$CODE$
),
(
  'P08',
  'Count Items in List / Combo Box',
  8,
  $CODE$package PRAC08;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class P08 {

    public static void main(String[] args) {

        System.setProperty(
                "webdriver.gecko.driver",
                "C:/Users/admin/Desktop/STQA/REQUIRED FILES/CHROME DRIVER/geckodriver.exe"
        );

        WebDriver driver = new FirefoxDriver();

        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

        driver.get("https://www.facebook.com/reg/");

        WebElement month = driver.findElement(
                By.xpath("//div[@role='combobox' and @aria-label='Select month']")
        );

        month.click();

        List<WebElement> mylist = driver.findElements(
                By.xpath("//div[@role='option']")
        );

        System.out.println("Number of items = " + mylist.size());

        driver.quit();
    }
}$CODE$
),
(
  'P09',
  'Count Checked & Unchecked Checkboxes',
  9,
  $CODE$package PRAC09;

import java.io.File;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

public class P09 {

    public static void main(String[] args) {

        System.setProperty(
                "webdriver.gecko.driver",
                "C:/Users/admin/Desktop/STQA/REQUIRED FILES/CHROME DRIVER/geckodriver.exe"
        );

        WebDriver driver = new FirefoxDriver();

        driver.get(new File("P09.html").toURI().toString());

        int chk = 0;
        int unchk = 0;

        List<WebElement> els = driver.findElements(
                By.xpath("//input[@type='checkbox']")
        );

        for (WebElement el : els) {

            if (el.isSelected()) {
                chk++;
            } else {
                unchk++;
            }
        }

        System.out.println("Total checkboxes = " + els.size());
        System.out.println("Total checked items = " + chk);
        System.out.println("Total unchecked items = " + unchk);

        driver.quit();
    }
}


<!DOCTYPE html>
<html>
<body>

<h2>Select Languages Known</h2>

<input type="checkbox" name="lang" value="Java"> Java<br>
<input type="checkbox" name="lang" value="PHP" checked> PHP<br>
<input type="checkbox" name="lang" value="C#"> C#<br>
<input type="checkbox" name="lang" value="Python" checked> Python<br>
<input type="checkbox" name="lang" value="Ruby"> Ruby<br>

</body>
</html>$CODE$
)
ON CONFLICT (practical_number) DO UPDATE
SET
  practical_name = EXCLUDED.practical_name,
  source_code = EXCLUDED.source_code,
  display_order = EXCLUDED.display_order;
