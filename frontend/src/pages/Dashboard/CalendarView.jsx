import React, { useState, useEffect } from 'react'
import { api } from '@/api/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { getPriorityColor, formatDate } from '@/lib/utils'
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay } from 'date-fns'

export default function CalendarView() {
  const [schedule, setSchedule] = useState([])
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const [scheduleData, tasksData] = await Promise.all([
        api.getSchedule(),
        api.getTasks()
      ])
      setSchedule(scheduleData)
      setTasks(tasksData)
    } catch (error) {
      console.error('Failed to load calendar data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 })
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  const getTasksForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const scheduledTasks = schedule.filter(item => item.date === dateStr)
    
    // Also include tasks with deadlines on this date
    const deadlineTasks = tasks.filter(task => {
      if (!task.deadline) return false
      const taskDate = format(new Date(task.deadline), 'yyyy-MM-dd')
      return taskDate === dateStr && !scheduledTasks.some(s => s.taskId === task.id)
    })

    return [...scheduledTasks, ...deadlineTasks.map(task => ({ task, isDeadline: true }))]
  }

  const navigateWeek = (direction) => {
    setCurrentWeek(prev => direction === 'next' ? addWeeks(prev, 1) : subWeeks(prev, 1))
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Calendar View</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Calendar View</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium min-w-[200px] text-center">
                  {format(weekStart, 'MMM d')} - {format(weekEnd, 'MMM d, yyyy')}
                </span>
                <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setCurrentWeek(new Date())}
              >
                Today
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Weekly Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayTasks = getTasksForDate(day)
          const isToday = isSameDay(day, new Date())
          const isSelected = isSameDay(day, selectedDate)

          return (
            <Card 
              key={index}
              className={`min-h-[200px] cursor-pointer transition-colors ${
                isToday ? 'border-blue-500 bg-blue-50' : ''
              } ${isSelected ? 'ring-2 ring-blue-300' : ''}`}
              onClick={() => setSelectedDate(day)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {format(day, 'EEE')}
                  </span>
                  <span className={`text-lg font-semibold ${
                    isToday ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {format(day, 'd')}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {dayTasks.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No tasks scheduled
                  </p>
                ) : (
                  dayTasks.map((item, taskIndex) => {
                    const task = item.task || tasks.find(t => t.id === item.taskId)
                    if (!task) return null

                    return (
                      <div
                        key={taskIndex}
                        className={`p-2 rounded text-xs border ${
                          item.isDeadline 
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="font-medium truncate mb-1">
                          {task.title}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            className={`text-xs ${getPriorityColor(task.priority)}`}
                            variant="outline"
                          >
                            {task.priority}
                          </Badge>
                          {item.isDeadline && (
                            <span className="text-xs text-red-600">Deadline</span>
                          )}
                          {item.scheduledStart && (
                            <span className="text-xs text-gray-500">
                              {format(new Date(item.scheduledStart), 'HH:mm')}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Tasks for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getTasksForDate(selectedDate).length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tasks scheduled for this day
              </p>
            ) : (
              <div className="space-y-3">
                {getTasksForDate(selectedDate).map((item, index) => {
                  const task = item.task || tasks.find(t => t.id === item.taskId)
                  if (!task) return null

                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{task.title}</h4>
                        {task.description && (
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          {task.duration && (
                            <span className="text-sm text-gray-500">{task.duration} min</span>
                          )}
                          {item.isDeadline && (
                            <Badge variant="destructive">Deadline</Badge>
                          )}
                        </div>
                      </div>
                      {item.scheduledStart && (
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {format(new Date(item.scheduledStart), 'HH:mm')}
                          </div>
                          <div className="text-xs text-gray-500">
                            - {format(new Date(item.scheduledEnd), 'HH:mm')}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
