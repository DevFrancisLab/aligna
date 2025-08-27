import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'

export default function TaskList({ tasks = [], onTasksUpdated }) {
  return (
    <div className="space-y-4">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks available.</p>
      ) : (
        tasks.map(task => (
          <Card key={task.id}>
            <CardHeader>
              <CardTitle>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
              <Button size="sm" onClick={() => console.log('Update or delete', task.id)}>
                Action
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
