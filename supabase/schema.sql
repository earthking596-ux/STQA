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

-- Note: No INSERT, UPDATE, or DELETE policies are created for anon/public roles,
-- keeping database modifications strictly restricted to the project owner/service_role.

-- Seed Practical Programs (P03 to P09)
INSERT INTO public.practicals (practical_number, practical_name, display_order, source_code)
VALUES
(
  'P03',
  'Selenium RC',
  1,
  $CODE$package PRACO3;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class P03 {

    public static void main(String[] args) throws InterruptedException {

        System.setProperty(
                "webdriver.gecko.driver",
                "C:/Users/admin/Desktop/STQA/REQUIRED FILES/CHROME DRIVER/geckodriver.exe"
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
  'Login Automation',
  2,
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
  'Excel Records',
  3,
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
                new File("C:/Users/admin/Desktop/STQA/PRACTICALS/input1.xls")
        );

        Sheet s = wb.getSheet(0);

        WritableWorkbook wwb = Workbook.createWorkbook(
                new File("src/PRAC05/output.xls")
        );

        WritableSheet ws = wwb.createSheet("Result", 0);

        String[][] a = new String[s.getRows()][s.getColumns()];

        for (int i = 0; i < s.getRows(); i++) {
            for (int j = 0; j < s.getColumns(); j++) {

                a[i][j] = s.getCell(j, i).getContents();

                Label cell = new Label(j, i, a[i][j]);
                ws.addCell(cell);
            }
        }

        Label header = new Label(6, 0, "Result");
        ws.addCell(header);

        for (int i = 1; i < s.getRows(); i++) {

            boolean pass = true;

            for (int j = 2; j < s.getColumns(); j++) {

                int marks = Integer.parseInt(a[i][j]);

                if (marks <= 35) {
                    pass = false;
                    break;
                }
            }

            String result = pass ? "pass" : "fail";

            Label cell = new Label(6, i, result);
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
  'Student Marks',
  4,
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
                new File("C:/Users/admin/Desktop/STQA/PRACTICALS/input1.xls")
        );

        Sheet s = wb.getSheet(0);

        WritableWorkbook wwb = Workbook.createWorkbook(
                new File("src/PRAC06/output.xls")
        );

        WritableSheet ws = wwb.createSheet("Result", 0);

        String[][] a = new String[s.getRows()][s.getColumns()];

        for (int i = 0; i < s.getRows(); i++) {
            for (int j = 0; j < s.getColumns(); j++) {

                a[i][j] = s.getCell(j, i).getContents();

                Label cell = new Label(j, i, a[i][j]);
                ws.addCell(cell);
            }
        }

        Label header = new Label(6, 0, "Result");
        ws.addCell(header);

        for (int i = 1; i < s.getRows(); i++) {

            boolean pass = true;

            for (int j = 2; j < s.getColumns(); j++) {

                int marks = Integer.parseInt(a[i][j]);

                if (marks <= 35) {
                    pass = false;
                    break;
                }
            }

            String result = pass ? "pass" : "fail";

            Label cell = new Label(6, i, result);
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
  'P07',
  'Object Counting',
  5,
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
  'List / Combo Box',
  6,
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
  'Checkbox Counting',
  7,
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
}$CODE$
)
ON CONFLICT (practical_number) DO UPDATE
SET
  practical_name = EXCLUDED.practical_name,
  source_code = EXCLUDED.source_code,
  display_order = EXCLUDED.display_order;
