import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const client = new DynamoDBClient({});

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { bookId, userId, rating, comment } = body;

        // Validate input
        if (!bookId || !userId || !rating) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ 
                    error: "Missing required fields: bookId, userId, rating" 
                })
            };
        }

        // Validate rating is between 1-5
        if (rating < 1 || rating > 5) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({ 
                    error: "Rating must be between 1 and 5" 
                })
            };
        }

        const reviewId = uuidv4();
        const timestamp = new Date().toISOString();

        const command = new PutItemCommand({
            TableName: "Reviews",
            Item: {
                "bookId": { S: bookId },
                "reviewId": { S: reviewId },
                "userId": { S: userId },
                "rating": { N: rating.toString() },
                "comment": { S: comment || "" },
                "createdAt": { S: timestamp }
            }
        });

        await client.send(command);

        return {
            statusCode: 201,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "Review added successfully",
                reviewId: reviewId
            })
        };
    } catch (error) {
        console.error("Error:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ error: "Failed to add review" })
        };
    }
};
