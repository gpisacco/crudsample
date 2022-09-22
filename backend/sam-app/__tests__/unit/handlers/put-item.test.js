// Import all functions from put-item.js 
const lambda = require('../../../src/handlers/put-item.js'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
// This includes all tests for putItemHandler() 
describe('Test putItemHandler', function () { 
    let putSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        putSpy.mockRestore(); 
    }); 
 
    // This test invokes putItemHandler() and compare the result  
    it('should add id to the table', async () => { 
        const returnedItem = { phone: '222', name: 'name1' }; 
 
        // Return the specified value whenever the spied put function is called 
        putSpy.mockReturnValue({ 
            promise: () => Promise.resolve(returnedItem) 
        }); 
 
        const event = { 
            httpMethod: 'PUT', 
            body: '{"phone": "222","name": "name1"}',
            headers: {
                origin: 'http://localhost:3000',
                Referer: 'http://localhost:3000/',
              }
        }; 
     
        // Invoke putItemHandler() 
        const result = await lambda.putItemHandler(event); 
        const expectedResult = { 
            statusCode: 200, 
            body: JSON.stringify(returnedItem),
            headers: {
                "Access-Control-Allow-Origin":
                  event.headers.origin || event.headers.Referer || "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
                "Access-Control-Allow-Headers":
                  "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              }
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    }); 
}); 
 