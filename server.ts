import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface PracticalRecord {
  id: string;
  practical_number: string;
  practical_name: string;
  source_code: string;
  display_order: number;
  created_at: string;
}

const PRACTICALS_DATABASE: PracticalRecord[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    practical_number: 'P03',
    practical_name: 'Selenium RC',
    display_order: 1,
    created_at: '2026-10-31T00:00:00.000Z',
    source_code: `package PRACO3;

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
}`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    practical_number: 'P04',
    practical_name: 'Login Automation',
    display_order: 2,
    created_at: '2026-10-31T00:01:00.000Z',
    source_code: `package PRAC04;

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
}`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    practical_number: 'P05',
    practical_name: 'Excel Records',
    display_order: 3,
    created_at: '2026-10-31T00:02:00.000Z',
    source_code: `package PRAC05;

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
}`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    practical_number: 'P06',
    practical_name: 'Student Marks',
    display_order: 4,
    created_at: '2026-10-31T00:03:00.000Z',
    source_code: `package PRAC06;

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
}`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    practical_number: 'P07',
    practical_name: 'Object Counting',
    display_order: 5,
    created_at: '2026-10-31T00:04:00.000Z',
    source_code: `package PRAC07;

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
}`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    practical_number: 'P08',
    practical_name: 'List / Combo Box',
    display_order: 6,
    created_at: '2026-10-31T00:05:00.000Z',
    source_code: `package PRAC08;

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
}`,
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440009',
    practical_number: 'P09',
    practical_name: 'Checkbox Counting',
    display_order: 7,
    created_at: '2026-10-31T00:06:00.000Z',
    source_code: `package PRAC09;

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
}`,
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Public SELECT endpoint: list practicals ordered by display_order
  app.get('/api/practicals', (_req, res) => {
    const sorted = [...PRACTICALS_DATABASE]
      .sort((a, b) => a.display_order - b.display_order)
      .map(({ id, practical_number, practical_name, display_order, created_at }) => ({
        id,
        practical_number,
        practical_name,
        display_order,
        created_at,
      }));
    res.json(sorted);
  });

  // Public SELECT endpoint: fetch complete source_code for a single practical by practical_number
  app.get('/api/practicals/:practicalNumber', (req, res) => {
    const { practicalNumber } = req.params;
    const record = PRACTICALS_DATABASE.find(
      (item) => item.practical_number.toUpperCase() === practicalNumber.toUpperCase()
    );

    if (!record) {
      return res.status(404).json({ error: `Practical ${practicalNumber} not found` });
    }

    return res.json(record);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
