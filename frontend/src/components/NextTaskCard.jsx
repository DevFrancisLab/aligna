import React, { useState, useEffect } from 'react'
import { api } from '@/api/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, Zap, Loader2 } from 'lucide-react'
import { getPriorityColor, formatDateTime } from '@/lib/utils'

export default function NextTaskCard() {
  const [nextTask, setNextTask] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadNextTask()
  }, [])

  const loadNextTask = async () => {
    try {
      setIsLoading(true)
      const data = await api.getNextTask()
      setNextTask(data)
    } catch (err) {
      setError('Failed to load next task')
      console.error('Failed to load next task:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartTask = () => {
    // In a real app, this would update the task status and start tracking
    console.log('Starting task:', nextTask?.task?.id)
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span>Next Recommended Task</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !nextTask) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-blue-600" />
            <span>Next Recommended Task</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {error || 'No tasks to recommend right now'}
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadNextTask}
              className="mt-4"
            >
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { task, recommendedTime, reason } = nextTask

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-blue-600" />
          <span>Next Recommended Task</span>
        </CardTitle>
        <CardDescription>
          AI-powered task recommendation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          )}
          
          <div className="flex items-center space-x-2 mb-3">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            {task.duration && (
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {task.duration} min
              </div>
            )}
          </div>
        </div>

        {recommendedTime && (
          <div className="bg-white rounded-lg p-3 border border-blue-200">
            <div className="flex items-center text-sm text-blue-700 mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              Recommended time
            </div>
            <p className="text-sm font-medium text-gray-900">
              {formatDateTime(recommendedTime)}
            </p>
          </div>
        )}

        {reason && (
          <div className="text-sm text-gray-600 bg-white rounded-lg p-3 border border-gray-200">
            <strong>Why now:</strong> {reason}
          </div>
        )}

        <div className="flex space-x-2">
          <Button 
            onClick={handleStartTask}
            className="flex-1"
            size="sm"
          >
            Start Task
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={loadNextTask}
          >
            Skip
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
