import React, { useEffect, useState } from 'react'
import { Book, GraduationCap, BarChart, Settings, Bell, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CourseDashboard() {

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/cursos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCourses(data); // Set the courses state with the fetched data
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  interface Course {
    id: number;
    nombre: string;
    descripcion: string;
  }

  const [courses, setCourses] = useState<Course[]>([])
  useEffect(() => {
    fetchCourses();
  }, [])

  console.log(courses);



  // const courses = [
  //   { id: 1, name: "Introduction to React", progress: 75 },
  //   { id: 2, name: "Advanced JavaScript", progress: 40 },
  //   { id: 3, name: "UI/UX Design Principles", progress: 90 },
  //   { id: 4, name: "Node.js Fundamentals", progress: 60 },
  // ]

  return (

    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-green-600">LearnHub</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center py-2 px-4 bg-green-100 text-green-700">
            <Book className="mr-3 h-5 w-5" />
            Courses
          </a>
          <a href="#" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
            <GraduationCap className="mr-3 h-5 w-5" />
            My Learning
          </a>
          <a href="#" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
            <BarChart className="mr-3 h-5 w-5" />
            Progress
          </a>
          <a href="#" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
            <Settings className="mr-3 h-5 w-5" />
            Settings
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
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Course Grid */}
        <main className="flex-1 overflow-y-auto p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Mis cursos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">Progreso</div>
                    <div className="text-sm font-medium">30%</div>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `30%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-900 py-10">{course.descripcion}</div>
                  <Button className="w-full mt-4">Continuar</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}