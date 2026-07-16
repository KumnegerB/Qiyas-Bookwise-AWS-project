import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    try {
        const bookId = event.pathParameters?.bookId;
        
        if (!bookId) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ error: "Missing bookId parameter" })
            };
        }

        const command = new GetItemCommand({
            TableName: "Books",
            Key: { "bookId": { S: bookId } }
        });
        const response = await docClient.send(command);

        if (!response.Item) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ error: "Book not found" })
            };
        }

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(response.Item)
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: "Failed to fetch book" })
        };
    }
};
