import React, { useEffect, useState } from 'react';
import { Book, GraduationCap, BarChart, Settings, Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ExamPage() {
    interface Content {
        id: number;
        idleccion: number;
        tipoContenido: string;
        titulo: string;
        contenido: string;
    }

    interface Question {
        id: number;
        idleccion: number;
        enunciado: string;
        tipoPregunta: {
            id: number;
            nombre: string;
        }
        dificultad: {
            id: number;
            nombre: string;
        }
    }

    interface Answer {
        idPregunta: number;
        esCorrecta: boolean;
        contenido: string;
        feedback: string;
    }

    const leccionId = localStorage.getItem('leccionId');
    const [contents, setContents] = useState<Content[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showContent, setShowContent] = useState(true);

    const fetchContentsByLesson = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/contenidos?lessonId=${leccionId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setContents(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    };

    const fetchQuestionsByLesson = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/preguntas?lessonId=${leccionId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const fetchAnswersByQuestionId = async (questionId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/respuestas?questionId=${questionId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setAnswers(data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        const authenticated = localStorage.getItem('authenticated');
        const userId = localStorage.getItem('userId');
        if (!authenticated || authenticated !== 'true' || !userId) {
            window.location.href = '/login';
        }
        fetchContentsByLesson();
        fetchQuestionsByLesson();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            fetchAnswersByQuestionId(questions[currentQuestionIndex].id);
        }
    }, [currentQuestionIndex]);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];
    const currentContent = contents[currentQuestionIndex];
    console.log(contents);


    const [showLogout, setShowLogout] = useState(false);
    const handleAvatarClick = () => setShowLogout(!showLogout);
    const handleLogout = () => {
        localStorage.setItem('authenticated', 'false');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-green-600">PrimiparApp</h1>
                </div>
                <nav className="mt-6">
                    <a href="#" className="flex items-center py-2 px-4 bg-green-100 text-green-700">
                        <Book className="mr-3 h-5 w-5" />
                        Inicio
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="flex justify-between items-center p-4 bg-white shadow">
                    <div className="flex items-center w-1/3">
                        <Input type="text" placeholder="Buscar cursos" className="w-full text-gray-900" />
                        <Button variant="ghost" size="icon" className="ml-2">
                            <Search className="h-5 w-5 text-black" />
                            <span className="sr-only">Buscar</span>
                        </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5 text-black" />
                            <span className="sr-only">Notificaciones</span>
                        </Button>
                        <Avatar onClick={handleAvatarClick} className="cursor-pointer">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {showLogout && (
                            <Button
                                onClick={handleLogout}
                                className="absolute top-14 right-[0.3rem] mt-2 bg-red-500 text-white p-2 rounded shadow-md"
                            >
                                Cerrar Sesión
                            </Button>
                        )}
                    </div>
                </header>

                {/* Question Navigation */}
                <main className="flex-1 overflow-y-auto p-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Lecciones</h2>
                    {/* Enunciados */}
                    {showContent && <>
                        {currentContent ? (
                            <Card key={currentContent.id} className="mb-6">
                                <CardHeader>
                                    <CardTitle>{currentContent.titulo}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{currentContent.contenido}</p>
                                </CardContent>
                            </Card>
                        ) : (
                            <p>No hay contenido</p>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            <Button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className=" text-white p-2 rounded"
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className=" text-white p-2 rounded"
                            >
                                Siguiente
                            </Button>
                        </div>
                        {(currentQuestionIndex === contents.length - 1) && <>
                            <Button
                                onClick={() => {
                                    setShowContent(false)
                                    setCurrentQuestionIndex(0)
                                }}
                                className="bg-green-700 mt-10 text-white p-2 rounded"
                            >
                                Ir a Preguntas

                            </Button>
                        </>}
                    </>}


                    {/* // la parte de las preguntas jejeje */}
                    {!showContent && <>
                        {console.log(currentQuestion)}
                        {currentQuestion ? (
                            <Card key={currentQuestion.id} className="mb-6">
                                <CardHeader>
                                    <CardTitle>{currentQuestion.enunciado}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>Tipo de Pregunta: {currentQuestion.tipoPregunta.nombre}</p>
                                    <p>Dificultad: {currentQuestion.dificultad.nombre}</p>
                                    {currentQuestion.tipoPregunta.nombre === "abierta" && <>
                                        <div className="mt-10"></div>
                                        <Input type="text" placeholder="Escribe tu respuesta" className="w-full text-gray-900" />
                                    </>}
                                    {currentQuestion.tipoPregunta.nombre === "opcion multiple" && <>
                                        <div className="space-y-2" role="radiogroup" aria-labelledby="answers-label">
                                            <p id="answers-label" className="sr-only">Selecciona una respuesta:</p>
                                            {answers.map((answer, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    className="w-full text-left justify-start h-auto py-3 px-4"
                                                    role="radio"
                                                    aria-checked="false"
                                                >
                                                    {answer.contenido}
                                                </Button>
                                            ))}
                                        </div>
                                    </>}
                                </CardContent>
                            </Card>
                        ) : (
                            <p>No hay preguntas disponibles.</p>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            <Button
                                onClick={handlePrevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className=" text-white p-2 rounded"
                            >
                                Anterior
                            </Button>
                            <Button
                                onClick={handleNextQuestion}
                                disabled={currentQuestionIndex === questions.length - 1}
                                className=" text-white p-2 rounded"
                            >
                                Siguiente
                            </Button>
                        </div>
                    </>}


                </main>
            </div>
        </div>
    );
}
