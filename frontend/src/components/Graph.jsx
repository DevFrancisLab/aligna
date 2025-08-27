import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Network, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'
import { getPriorityColor } from '@/lib/utils'

// Mock graph data for demonstration
const mockGraphData = {
  nodes: [
    { id: '1', title: 'Complete project proposal', priority: 'high', status: 'pending', x: 100, y: 100 },
    { id: '2', title: 'Review code changes', priority: 'medium', status: 'in_progress', x: 300, y: 150 },
    { id: '3', title: 'Update documentation', priority: 'low', status: 'pending', x: 200, y: 250 },
    { id: '4', title: 'Deploy to staging', priority: 'medium', status: 'pending', x: 400, y: 200 },
    { id: '5', title: 'User testing', priority: 'high', status: 'pending', x: 350, y: 300 }
  ],
  edges: [
    { from: '1', to: '3' },
    { from: '2', to: '4' },
    { from: '3', to: '5' },
    { from: '4', to: '5' }
  ]
}

export default function Graph({ tasks = [] }) {
  const [selectedNode, setSelectedNode] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [graphData, setGraphData] = useState(mockGraphData)

  useEffect(() => {
    // Simulate loading and process real tasks if available
    const timer = setTimeout(() => {
      if (tasks.length > 0) {
        // Convert tasks to graph format
        const nodes = tasks.map((task, index) => ({
          id: task.id,
          title: task.title,
          priority: task.priority,
          status: task.status,
          x: 100 + (index % 3) * 150,
          y: 100 + Math.floor(index / 3) * 120
        }))

        const edges = tasks
          .filter(task => task.dependencies && task.dependencies.length > 0)
          .flatMap(task => 
            task.dependencies.map(depId => ({
              from: depId,
              to: task.id
            }))
          )

        setGraphData({ nodes, edges })
      }
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [tasks])

  const handleNodeClick = (node) => {
    setSelectedNode(node)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setSelectedNode(null)
  }

  const getNodeColor = (node) => {
    switch (node.status) {
      case 'completed':
        return 'bg-green-100 border-green-300 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 border-blue-300 text-blue-800'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5" />
            <span>Task Dependencies</span>
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
    <Card className="h-96">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5" />
            <span>Task Dependencies</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-80 overflow-hidden bg-gray-50">
          <svg 
            className="w-full h-full"
            style={{ transform: `scale(${zoom})` }}
            viewBox="0 0 500 400"
          >
            {/* Render edges */}
            {graphData.edges.map((edge, index) => {
              const fromNode = graphData.nodes.find(n => n.id === edge.from)
              const toNode = graphData.nodes.find(n => n.id === edge.to)
              
              if (!fromNode || !toNode) return null
              
              return (
                <line
                  key={index}
                  x1={fromNode.x + 40}
                  y1={fromNode.y + 20}
                  x2={toNode.x + 40}
                  y2={toNode.y + 20}
                  stroke="#94a3b8"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              )
            })}
            
            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#94a3b8"
                />
              </marker>
            </defs>
            
            {/* Render nodes */}
            {graphData.nodes.map((node) => (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width="80"
                  height="40"
                  rx="6"
                  className={`cursor-pointer transition-all ${getNodeColor(node)} ${
                    selectedNode?.id === node.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleNodeClick(node)}
                />
                <text
                  x={node.x + 40}
                  y={node.y + 25}
                  textAnchor="middle"
                  className="text-xs font-medium pointer-events-none"
                  fill="currentColor"
                >
                  {node.title.length > 10 ? node.title.substring(0, 10) + '...' : node.title}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3 text-xs">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                <span>In Progress</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                <span>Completed</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Selected node details */}
        {selectedNode && (
          <div className="p-4 border-t bg-white">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{selectedNode.title}</h4>
                <Badge className={getPriorityColor(selectedNode.priority)}>
                  {selectedNode.priority}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">
                Status: <span className="capitalize">{selectedNode.status}</span>
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedNode(null)}
              >
                Close Details
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
