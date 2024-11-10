import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface AdaptiveCardProps {
    content: string
    isQuestion?: boolean
    answers?: string[]
}

export default function TestCard({ content, isQuestion = false, answers = [] }: AdaptiveCardProps) {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    {isQuestion ? "Question" : "Content"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-center mb-4">{content}</p>
                {isQuestion && answers.length > 0 && (
                    <div className="space-y-2" role="radiogroup" aria-labelledby="answers-label">
                        <p id="answers-label" className="sr-only">Select an answer:</p>
                        {answers.map((answer, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full text-left justify-start h-auto py-3 px-4"
                                role="radio"
                                aria-checked="false"
                            >
                                {answer}
                            </Button>
                        ))}
                    </div>
                )}
            </CardContent>
            {!isQuestion && (
                <CardFooter className="flex justify-center">
                    <Button variant="ghost">Learn More</Button>
                </CardFooter>
            )}
        </Card>
    )
}