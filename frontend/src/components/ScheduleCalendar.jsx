import React, { useEffect, useState, useRef } from 'react'
import { api } from '@/api/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar } from 'lucide-react'
import { getPriorityColor } from '@/lib/utils'

export default function ScheduleCalendar() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const taskRefs = useRef({})
  const svgRef = useRef(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const data = await api.getTasks()
      setTasks(data)
    } catch (err) {
      console.error(err)
      setError('Failed to load tasks')
    }
  }

  // Map tasks by ID for easier lookup
  const taskMap = tasks.reduce((acc, task) => {
    acc[task.id] = { task }
    return acc
  }, {})

  // Calculate arrow path between two elements
  const getArrowPath = (fromEl, toEl) => {
    const fromRect = fromEl.getBoundingClientRect()
    const toRect = toEl.getBoundingClientRect()
    const svgRect = svgRef.current.getBoundingClientRect()

    const startX = fromRect.right - svgRect.left
    const startY = fromRect.top + fromRect.height / 2 - svgRect.top
    const endX = toRect.left - svgRect.left
    const endY = toRect.top + toRect.height / 2 - svgRect.top

    // Curved cubic path
    const dx = (endX - startX) / 2
    return `M${startX},${startY} C${startX + dx},${startY} ${endX - dx},${endY} ${endX},${endY}`
  }

  // Render dependency arrows
  const renderDependencyArrows = () => {
    const arrows = []
    let index = 0
    Object.values(taskMap).forEach(taskItem => {
      const taskEl = taskRefs.current[taskItem.task.id]
      if (!taskEl || !taskItem.task.dependencies) return

      taskItem.task.dependencies.forEach(depId => {
        const depItem = taskMap[depId]
        const depEl = taskRefs.current[depId]
        if (!depEl) return

        const pathD = getArrowPath(depEl, taskEl)
        arrows.push(
          <path
            key={`${depId}-${taskItem.task.id}`}
            d={pathD}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
            className="dependency-arrow"
            style={{ animationDelay: `${index * 0.3}s` }}
          />
        )
        index++
      })
    })
    return arrows
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Schedule</CardTitle>
      </CardHeader>
      <CardContent className="relative overflow-auto">
        {error && <p className="text-red-600">{error}</p>}
        <div className="flex flex-col space-y-4 relative">
          {tasks.map(task => (
            <div
              key={task.id}
              ref={el => (taskRefs.current[task.id] = el)}
              className="p-4 bg-white rounded-lg shadow flex flex-col space-y-1 border"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">{task.title}</h3>
                <Badge className={getPriorityColor(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
              {task.duration && (
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {task.duration} min
                </div>
              )}
              {task.deadline && (
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(task.deadline).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SVG arrows */}
        <svg
          ref={svgRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 6 3, 0 6" fill="#3b82f6" />
            </marker>
          </defs>
          {renderDependencyArrows()}
        </svg>
      </CardContent>

      {/* Animated arrow CSS */}
      <style>
        {`
          .dependency-arrow {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: drawArrow 0.8s ease forwards;
          }

          @keyframes drawArrow {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </Card>
  )
}
