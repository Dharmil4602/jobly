// // Description: This is the content script that is injected into the webpage. This will be used for Web Scraping the data from the source.
// /**
//  * Required Details to be scrapped:
//  * 1. Job Title
//  * 2. Job Description
//  * 3. Company Name
//  */
import * as cheerio from "cheerio";
import {
  companyNameSelectors,
  jobDescriptionSelectors,
  jobTitleSelectors,
} from "../components/selectors/Selectors";

const jobDetailsExtraction = async ($: cheerio.CheerioAPI): Promise<any> => {
  let jobTitle = "N/A";
  let description = "N/A";
  for (const selector of jobTitleSelectors) {
    const title = $(selector).text().trim();
    if (title) {
      jobTitle = title;
      break;
    }
  }
  console.log("Job Title using selectors:", [{jobTitle}]);

  const jobDescription = $('.job-description > p, .description > p, .responsibilities, section:contains("Job Description"), section:contains("Description"), p:contains("Job Description"), p:contains("Description"), .job-description, .description, .job-desc, .job-details, .job-content, .job-body, .posting-description, .job-description-content, [class*="description"], [class*="details"], [class*="content"], section:contains("Job Description"), section:contains("Responsibilities"), div:contains("Job Overview"), p:contains("Job Description"), p:contains("Responsibilities"), div:contains("Requirements"), article, section, div')
      .map((_: any, element: any) => $(element).text().trim())
      .get()
      .join(" ") || "N/A";

  // Logging the results for debugging purposes
  //   console.log("Job Title:", jobTitle);
  //   console.log("Company Name:", companyName);
    console.log("Job Description:", [{jobDescription}]);

    // Returning all extracted details as an object
    return {
      jobTitle,
    //   companyName,
      jobDescription,
    };
};

const sendHTMLtoBackground = async (
  url: string,
  html: string
): Promise<void> => {
  try {
    const response = await chrome.runtime.sendMessage({
      url: url,
      jobDetails: html,
    });
    console.log("Response from background script:", response);
  } catch (error) {
    console.error("Error sending message to background script:", error);
  }
};

(async () => {
  try {
    const url = window.location.href;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const htmlText = await response.text();
    const $ = cheerio.load(htmlText);

    const extractedJobDetails = await jobDetailsExtraction($);
    await sendHTMLtoBackground(url, extractedJobDetails);
    console.log("Response sent to background script");
  } catch (error) {
    console.error("Error fetching or parsing the data:", error);
  }
})();

export {};
