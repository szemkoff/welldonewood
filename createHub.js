const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Replace this with the path to your downloaded credentials JSON file
const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');

/**
 * Creates a new Google Sheets document for social media management
 */
async function createSocialMediaHub() {
  try {
    // Load credentials from the downloaded JSON file
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));

    // Create a JWT client using the service account credentials
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
    );

    // Create Google Sheets client
    const sheets = google.sheets({ version: 'v4', auth });

    // Create a new spreadsheet
    const spreadsheet = await sheets.spreadsheets.create({
      resource: {
        properties: {
          title: 'Welldonewood Social Media Hub',
          locale: 'en_US',
          timeZone: 'America/New_York', // Adjust as needed
        },
        sheets: [
          { properties: { title: 'Dashboard', gridProperties: { rowCount: 50, columnCount: 20 } } },
          { properties: { title: 'Content Calendar', gridProperties: { rowCount: 100, columnCount: 15 } } },
          { properties: { title: 'Content Ideas', gridProperties: { rowCount: 100, columnCount: 10 } } },
          { properties: { title: 'Analytics Tracker', gridProperties: { rowCount: 100, columnCount: 15 } } },
          { properties: { title: 'Asset Inventory', gridProperties: { rowCount: 100, columnCount: 10 } } },
          { properties: { title: 'UTM Builder', gridProperties: { rowCount: 50, columnCount: 10 } } },
        ],
      },
    });

    const spreadsheetId = spreadsheet.data.spreadsheetId;
    console.log(`Created spreadsheet: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);

    // Set up the Content Calendar tab
    await setupContentCalendarTab(sheets, spreadsheetId);
    
    // Set up the Content Ideas tab
    await setupContentIdeasTab(sheets, spreadsheetId);
    
    // Set up the Dashboard tab
    await setupDashboardTab(sheets, spreadsheetId);
    
    // Set up the Analytics Tracker tab
    await setupAnalyticsTrackerTab(sheets, spreadsheetId);
    
    // Set up the Asset Inventory tab
    await setupAssetInventoryTab(sheets, spreadsheetId);
    
    // Set up the UTM Builder tab
    await setupUtmBuilderTab(sheets, spreadsheetId);

    console.log('Successfully set up all tabs in the Social Media Hub spreadsheet!');
    
    // Optional: Share the spreadsheet with the user's email
    // await shareSpreadsheet(auth, spreadsheetId, 'user@example.com');
    
    return spreadsheetId;
  } catch (error) {
    console.error('Error creating social media hub:', error);
    throw error;
  }
}

/**
 * Set up the Content Calendar tab with headers and sample data
 */
async function setupContentCalendarTab(sheets, spreadsheetId) {
  // Set up headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Content Calendar!A1:I1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Date', 'Time', 'Platform', 'Content Type', 'Copy/Caption', 'Image/Asset', 'Status', 'Assigned To', 'Performance']
      ]
    }
  });

  // Add sample data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Content Calendar!A2:I8',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['2023-04-26', '09:00', 'Facebook', 'Product', 'Check out our new oak dining table!', 'product_table_01.jpg', 'Published', 'Stan', '42 likes'],
        ['2023-04-26', '12:00', 'Instagram', 'Lifestyle', 'Perfect finish with our new stain', 'finish_demo.jpg', 'Published', 'Alex', '78 likes'],
        ['2023-04-27', '15:00', 'Pinterest', 'DIY', '5 steps to restore your old furniture', 'restoration_guide.jpg', 'Scheduled', 'Stan', '-'],
        ['2023-04-28', '10:00', 'Facebook', 'Promotional', 'Weekend sale! 15% off all tables', 'weekend_sale.jpg', 'Draft', 'Alex', '-'],
        ['2023-04-29', '14:00', 'Instagram', 'Behind Scenes', 'Making our signature chairs', 'workshop_bts.jpg', 'Idea', 'Stan', '-'],
        ['2023-04-30', '11:00', 'Pinterest', 'Inspiration', 'Design ideas for wooden accessories', 'accessory_ideas.jpg', 'Draft', 'Alex', '-'],
        ['2023-05-01', '09:00', 'Facebook', 'Educational', 'Wood types comparison guide', 'wood_types_guide.jpg', 'Idea', 'Stan', '-'],
      ]
    }
  });

  // Format the header row
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 1, // Content Calendar is the second sheet (0-indexed)
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.2, green: 0.2, blue: 0.6 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 1,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 9
            },
            properties: {
              pixelSize: 150
            },
            fields: 'pixelSize'
          }
        }
      ]
    }
  });

  console.log('Content Calendar tab set up complete');
}

/**
 * Set up the Content Ideas tab with headers and sample data
 */
async function setupContentIdeasTab(sheets, spreadsheetId) {
  // Set up headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Content Ideas!A1:G1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Idea Title', 'Description', 'Platform', 'Content Type', 'Potential Date', 'Notes', 'Status']
      ]
    }
  });

  // Add sample data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Content Ideas!A2:G7',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Customer Spotlight Series', 'Feature happy customers with their purchases', 'Instagram, FB', 'UGC', 'May', 'Ask for permission first', 'Approved'],
        ['Wood Care Tips', 'Series of short tips for maintaining wood furniture', 'All platforms', 'Educational', 'Ongoing', 'Create consistent graphic style', 'Approved'],
        ['DIY Accessory Projects', 'Simple projects customers can make at home', 'Pinterest', 'DIY', 'June', 'Link to product pages', 'In Review'],
        ['Seasonal Table Settings', 'Styling our tables for different seasons', 'Instagram', 'Lifestyle', 'Quarterly', 'Collaborate with local stylist', 'Idea'],
        ['Workshop Tour Video', 'Behind-the-scenes look at our production process', 'Facebook, IG', 'BTS', 'May 15', 'Need to clean workshop first', 'Approved'],
        ['Wood Sustainability Facts', 'Educational posts about our sustainable practices', 'All platforms', 'Educational', 'Ongoing', 'Research statistics', 'Idea']
      ]
    }
  });

  // Format the header row
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 2, // Content Ideas is the third sheet (0-indexed)
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.4, green: 0.6, blue: 0.2 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 2,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 7
            },
            properties: {
              pixelSize: 180
            },
            fields: 'pixelSize'
          }
        }
      ]
    }
  });

  console.log('Content Ideas tab set up complete');
}

/**
 * Set up the Dashboard tab
 */
async function setupDashboardTab(sheets, spreadsheetId) {
  // Set up Dashboard title and sections
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Dashboard!A1:F20',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['WELLDONEWOOD SOCIAL MEDIA HUB', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['CONTENT OVERVIEW', '', '', 'PLATFORM BREAKDOWN', '', ''],
        ['Total Posts Planned:', '24', '', 'Facebook:', '8 (33%)', ''],
        ['Posts This Week:', '6', '', 'Instagram:', '10 (42%)', ''],
        ['Posts Next Week:', '6', '', 'Pinterest:', '6 (25%)', ''],
        ['Content In Review:', '3', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['CONTENT PERFORMANCE', '', '', 'UPCOMING DEADLINES', '', ''],
        ['Top Post:', 'Product Showcase #3', '', 'Apr 28:', 'Blog post due', ''],
        ['Avg. Engagement Rate:', '3.2%', '', 'Apr 30:', 'Monthly report', ''],
        ['Trending Topics:', 'DIY, Finishing', '', 'May 2:', 'Product launch', ''],
        ['', '', '', '', '', ''],
        ['MONTHLY CONTENT BREAKDOWN', '', '', '', '', ''],
        ['Type', 'Count', '% of Total', 'Avg. Engagement', '', ''],
        ['Product', '10', '42%', '3.5%', '', ''],
        ['Educational', '6', '25%', '4.2%', '', ''],
        ['Promotional', '5', '21%', '2.8%', '', ''],
        ['UGC', '3', '12%', '3.1%', '', '']
      ]
    }
  });

  // Format the Dashboard
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        // Main title formatting
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: 0,
              endRowIndex: 1,
              startColumnIndex: 0,
              endColumnIndex: 6
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.2, green: 0.3, blue: 0.4 },
                textFormat: { 
                  bold: true, 
                  fontSize: 14,
                  foregroundColor: { red: 1, green: 1, blue: 1 } 
                },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        // Section headers formatting
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: 2,
              endRowIndex: 3,
              startColumnIndex: 0,
              endColumnIndex: 3
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.8, green: 0.6, blue: 0.2 },
                textFormat: { bold: true },
                horizontalAlignment: 'LEFT',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: 2,
              endRowIndex: 3,
              startColumnIndex: 3,
              endColumnIndex: 6
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.2, green: 0.6, blue: 0.8 },
                textFormat: { bold: true },
                horizontalAlignment: 'LEFT',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        // Monthly content breakdown header
        {
          repeatCell: {
            range: {
              sheetId: 0,
              startRowIndex: 13,
              endRowIndex: 14,
              startColumnIndex: 0,
              endColumnIndex: 6
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.4, green: 0.4, blue: 0.4 },
                textFormat: { 
                  bold: true,
                  foregroundColor: { red: 1, green: 1, blue: 1 } 
                },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        // Adjust column widths
        {
          updateDimensionProperties: {
            range: {
              sheetId: 0,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 6
            },
            properties: {
              pixelSize: 150
            },
            fields: 'pixelSize'
          }
        }
      ]
    }
  });

  console.log('Dashboard tab set up complete');
}

/**
 * Set up the Analytics Tracker tab
 */
async function setupAnalyticsTrackerTab(sheets, spreadsheetId) {
  // Set up headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Analytics Tracker!A1:K1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Date Range', 'Platform', 'Post Type', 'Post Link', 'Reach', 'Engagement', 'Clicks', 'Shares', 'Comments', 'Conversion', 'Notes']
      ]
    }
  });

  // Add sample data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Analytics Tracker!A2:K6',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Apr 1-7, 2023', 'Facebook', 'Product', 'fb.com/welldonewood/post123', '1,245', '87', '32', '5', '12', '3', 'Strong comments, questions'],
        ['Apr 1-7, 2023', 'Instagram', 'Lifestyle', 'instagram.com/p/abc123', '876', '112', '26', '8', '15', '2', 'Good user tags'],
        ['Apr 1-7, 2023', 'Pinterest', 'DIY', 'pinterest.com/pin/123456', '532', '45', '38', '12', '0', '5', 'High click-through rate'],
        ['Apr 8-14, 2023', 'Facebook', 'Promotional', 'fb.com/welldonewood/post124', '2,356', '156', '83', '14', '8', '12', 'Successful sale post'],
        ['Apr 8-14, 2023', 'Instagram', 'BTS', 'instagram.com/p/def456', '765', '98', '12', '4', '22', '0', 'High comment engagement']
      ]
    }
  });

  // Format the Analytics Tracker tab
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 3, // Analytics Tracker is the fourth sheet (0-indexed)
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.2, green: 0.4, blue: 0.5 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 3,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 11
            },
            properties: {
              pixelSize: 120
            },
            fields: 'pixelSize'
          }
        }
      ]
    }
  });

  console.log('Analytics Tracker tab set up complete');
}

/**
 * Set up the Asset Inventory tab
 */
async function setupAssetInventoryTab(sheets, spreadsheetId) {
  // Set up headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Asset Inventory!A1:G1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Asset Name', 'Type', 'Description', 'File Location', 'Created Date', 'Used In', 'Tags']
      ]
    }
  });

  // Add sample data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Asset Inventory!A2:G6',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['product_table_01.jpg', 'Product', 'Oak dining table main shot', 'Drive/WDW/Products/Tables/', '2023-03-15', 'FB Post Apr 26', 'table, oak, product'],
        ['finish_demo.jpg', 'Process', 'Applying finish to chair back', 'Drive/WDW/Process/Finishing/', '2023-03-22', 'IG Post Apr 26', 'finish, process, chair'],
        ['restoration_guide.jpg', 'Guide', 'Infographic for furniture restoration', 'Drive/WDW/Guides/', '2023-04-01', 'Pinterest Apr 27', 'DIY, restoration, guide'],
        ['weekend_sale.jpg', 'Promo', 'Weekend sale announcement graphic', 'Drive/WDW/Promotions/', '2023-04-20', 'FB Post Apr 28', 'sale, promo, discount'],
        ['workshop_bts.jpg', 'BTS', 'Workshop during chair production', 'Drive/WDW/Workshop/', '2023-03-10', 'IG Post Apr 29', 'workshop, BTS, chairs']
      ]
    }
  });

  // Format the Asset Inventory tab
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 4, // Asset Inventory is the fifth sheet (0-indexed)
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.5, green: 0.3, blue: 0.6 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 4,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 7
            },
            properties: {
              pixelSize: 170
            },
            fields: 'pixelSize'
          }
        }
      ]
    }
  });

  console.log('Asset Inventory tab set up complete');
}

/**
 * Set up the UTM Builder tab
 */
async function setupUtmBuilderTab(sheets, spreadsheetId) {
  // Set up headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'UTM Builder!A1:F1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['Campaign Source', 'Campaign Medium', 'Campaign Name', 'Campaign Term', 'Campaign Content', 'Full UTM']
      ]
    }
  });

  // Add sample data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'UTM Builder!A2:F4',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['facebook', 'social', 'spring_collection', 'oak_table', 'image_post', '?utm_source=facebook&utm_medium=social&utm_campaign=spring_collection&utm_content=image_post'],
        ['instagram', 'social', 'spring_collection', 'finish_demo', 'carousel_2', '?utm_source=instagram&utm_medium=social&utm_campaign=spring_collection&utm_content=carousel_2'],
        ['pinterest', 'social', 'diy_guides', 'restoration', 'pin_infographic', '?utm_source=pinterest&utm_medium=social&utm_campaign=diy_guides&utm_content=pin_infographic']
      ]
    }
  });

  // Add formula to generate UTM codes
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'UTM Builder!F5',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [
        ['=CONCATENATE("?utm_source=",A5,"&utm_medium=",B5,"&utm_campaign=",C5,"&utm_content=",E5)']
      ]
    }
  });

  // Format the UTM Builder tab
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: 5, // UTM Builder is the sixth sheet (0-indexed)
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.3, green: 0.5, blue: 0.4 },
                textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                horizontalAlignment: 'CENTER',
              }
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat,horizontalAlignment)'
          }
        },
        {
          updateDimensionProperties: {
            range: {
              sheetId: 5,
              dimension: 'COLUMNS',
              startIndex: 0,
              endIndex: 6
            },
            properties: {
              pixelSize: 180
            },
            fields: 'pixelSize'
          }
        }
      ]
    }
  });

  console.log('UTM Builder tab set up complete');
}

/**
 * Share the spreadsheet with a user
 */
async function shareSpreadsheet(auth, spreadsheetId, userEmail) {
  const drive = google.drive({ version: 'v3', auth });
  
  await drive.permissions.create({
    fileId: spreadsheetId,
    requestBody: {
      role: 'writer',
      type: 'user',
      emailAddress: userEmail,
    },
  });
  
  console.log(`Shared spreadsheet with ${userEmail}`);
}

// Execute the script
createSocialMediaHub()
  .then(spreadsheetId => {
    console.log(`Success! Your Social Media Hub is ready at: https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
  })
  .catch(error => {
    console.error('Error:', error);
  }); 