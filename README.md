# testlink-to-zephyr

Converter from Testlink test cases (exported to XML) to CSV ready to import to Zephyr

## Usage

```
npx testlink-to-zephyr --input=./testlink-export.xml --output=./zephyr-import.csv
```

or just

```
npx testlink-to-zephyr --input=./testlink-export.xml
```

Arguments:
* **input** - Path to an input XML
* **output** (optional) - Path to an output CSV ('result.csv' by default)

## Import to Zephyr Scale

![Screenshot 1](https://github.com/Kreozot/testlink-to-zephyr/raw/main/docs/import1.png)

![Screenshot 2](https://github.com/Kreozot/testlink-to-zephyr/raw/main/docs/import2.png)

Choose generated CSV file. Select semicolon as a CSV delimeter.

![Screenshot 3](https://github.com/Kreozot/testlink-to-zephyr/raw/main/docs/import3.png)

Ensure that fields mapping is correct:

![Screenshot 4](https://github.com/Kreozot/testlink-to-zephyr/raw/main/docs/import4.png)

## Features

* Hierarchical folders (from nested test suites)
* Labels (from test case keywords)

There is no statuses and importance mapping for now.
If you want some (or any other feature), feel free to send me a PR.
