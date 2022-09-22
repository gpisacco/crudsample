// Import all functions from get-by-id.js 
const lambda = require('../../../src/handlers/delete-item.js'); 
// Import dynamodb from aws-sdk 
const dynamodb = require('aws-sdk/clients/dynamodb'); 
 
// This includes all tests for getByIdHandler() 
describe('Test deletItemHandler', () => { 
    let getSpy; 
 
    // Test one-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown 
    beforeAll(() => { 
        // Mock dynamodb get and put methods 
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname 
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'delete'); 
    }); 
 
    // Clean up mocks 
    afterAll(() => { 
        getSpy.mockRestore(); 
    }); 
 
    // This test invokes getByIdHandler() and compare the result  
    it('should delete item by id', async () => { 
        const item = {}; 
 
        // Return the specified value whenever the spied get function is called 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve(item) 
        }); 
 
        const event = { 
            httpMethod: 'DELETE', 
            pathParameters: { 
                id: 'id1' 
            } ,
            headers: {
                origin: 'http://localhost:3000',
                Referer: 'http://localhost:3000/'
              }
        } 
 
        // Invoke getByIdHandler() 
        const result = await lambda.deletItemHandler(event); 
 
        const expectedResult = { 
            statusCode: 204, 
            body: JSON.stringify(item),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
                "Access-Control-Allow-Headers":
                  "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              }
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    });

       // This test invokes getByIdHandler() and compare the result  
    it('should delete item by id', async () => { 
        const item = {}; 
 
        // Return the specified value whenever the spied get function is called 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve(item) 
        }); 
 
        const event = { 
            httpMethod: 'DELETE', 
            pathParameters: { 
                id: 'id1' 
            } ,
            headers: {
                origin: 'http://localhost:3000',
                Referer: 'http://localhost:3000/'
              }
        } 
 
        // Invoke getByIdHandler() 
        const result = await lambda.deletItemHandler(event); 
 
        const expectedResult = { 
            statusCode: 204, 
            body: JSON.stringify(item),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
                "Access-Control-Allow-Headers":
                  "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
              }
        }; 
 
        // Compare the result with the expected result 
        expect(result).toEqual(expectedResult); 
    });

     // This test invokes getByIdHandler() and compare the result  
     it('should fail', async () => { 
        const item = {}; 
 
        // Return the specified value whenever the spied get function is called 
        getSpy.mockReturnValue({ 
            promise: () => Promise.resolve(item) 
        }); 
 
        const event = { 
            httpMethod: 'GET', 
            pathParameters: { 
                id: 'id1' 
            } ,
            headers: {
                origin: 'http://localhost:3000',
                Referer: 'http://localhost:3000/'
              }
        } 
 
        // Invoke getByIdHandler() 
        try {
            await lambda.deletItemHandler(event);
        } catch (err){
            // Compare the result with the expected result 
            expect(err.message).toEqual(`deletItemHandler only accepts DELETE method, you tried: GET method.`); 
        }
 
    });
}); 
 