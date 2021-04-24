#!/usr/bin/env node

import { argv } from 'yargs';
import {
  parseXml,
  openXml,
  stringify,
  save,
} from './files';

enum TestCaseStatus {
  Draft = 'Draft',
  Approved = 'Approved',
  InReview = 'In Review',
};

const CSV_HEADERS = [
  'Folder',
  'Name',
  'Status',
  'Precondition',
  'Labels',
  'Test Script (Step-by-Step) - Step',
  'Test Script (Step-by-Step) - Expected Result',
];

function getTestStepCsv(
  testStep,
  testSuiteTitle: string = '',
  testCaseTitle: string = '',
  testCasePreconditions: string = '',
  testCaseLabels: string = ''
): string[] {
  return [
    testSuiteTitle,
    testCaseTitle,
    TestCaseStatus.Approved,
    testCasePreconditions,
    testCaseLabels,
    testStep.actions[0],
    testStep.expectedresults[0],
  ];
}

function getTestCaseCsv(testCase, testSuiteTitle: string): string[][] {
  const testCaseTitle = testCase.$.name;
  const testCaseLabels = testCase.keywords
    ? testCase.keywords[0].keyword
      .map((keyword) => keyword.$.name)
      .join(', ')
    : ''
  const testCasePreconditions = testCase.preconditions
    ? testCase.preconditions[0]
    : '';
  return testCase.steps[0].step.reduce((result: string[][], testCase, index) => {
    // Leave test case parameters only for a first line
    const testStepCsv = index
      ? getTestStepCsv(testCase)
      : getTestStepCsv(testCase, testSuiteTitle, testCaseTitle, testCasePreconditions, testCaseLabels);
    result.push(testStepCsv);
    return result;
  }, []);
}

function getTestSuiteCsv(testSuite, parentTestSuiteTitle: string = ''): string[][] {
  const testSuiteTitle = parentTestSuiteTitle
    ? parentTestSuiteTitle + '/' + testSuite.$.name
    : testSuite.$.name
  const testSuiteResult = [];
  // Recursively process children test suites
  if (testSuite.testsuite) {
    testSuiteResult.push(...testSuite.testsuite.reduce((result: string[][], testSuiteChild) => {
      result.push(...getTestSuiteCsv(testSuiteChild, testSuiteTitle));
      return result;
    }, []));
  }

  if (!testSuite.testcase) {
    return testSuiteResult;
  }

  return testSuite.testcase.reduce((result: string[][], testCase) => {
    result.push(...getTestCaseCsv(testCase, testSuiteTitle));
    return result;
  }, testSuiteResult);
}

async function makeCsv(inputFilename: string, outputFilename: string = 'result.csv') {
  console.log(`Converting from "${inputFilename}" to "${outputFilename}"`);

  const xmlString = openXml(inputFilename);
  const xml = await parseXml(xmlString);

  const csvStrings: string[][] = [
    CSV_HEADERS,
    ...getTestSuiteCsv(xml.testsuite)
  ];
  const csv = await stringify(csvStrings);
  save(csv, outputFilename);

  console.log('Done');
}

async function start() {
  const inputFilename = argv.input as string;
  const outputFilename = argv.output as string;
  await makeCsv(inputFilename, outputFilename);
}

start();
