import React, { useRef, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, ZoomIn, ZoomOut, RotateCcw, Maximize } from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3';

interface NetworkNode {
  id: string;
  name: string;
  type: string;
  company?: string;
  fitScore?: number;
  investment?: string;
  relationship?: string;
  x?: number;
  y?: number;
  size: number;
  color: string;
}

interface NetworkLink {
  source: string | NetworkNode;
  target: string | NetworkNode;
  strength: number;
  type: string;
  label: string;
}

interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

interface NetworkGraphProps {
  data: NetworkData;
  title: string;
  height?: number;
  showControls?: boolean;
  layout?: 'force' | 'static';
  onNodeClick?: (node: NetworkNode) => void;
}

export function NetworkGraph({ 
  data, 
  title, 
  height = 400, 
  showControls = true,
  layout = 'force',
  onNodeClick 
}: NetworkGraphProps) {
  const graphRef = useRef<any>();
  const [graphData, setGraphData] = useState<NetworkData>(data);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Update graph data when props change
  useEffect(() => {
    // For warm pathfinding, use a more structured layout
    if (title.includes('Pathways')) {
      const enhancedData = {
        ...data,
        nodes: data.nodes.map((node, index) => ({
          ...node,
          // Create a more organized layout for pathfinding
          fx: node.type === 'company' ? 0 : 
              node.type === 'connector' ? Math.cos((index * 2 * Math.PI) / 3) * 120 :
              Math.cos((index * 2 * Math.PI) / 3) * 220,
          fy: node.type === 'company' ? 0 :
              node.type === 'connector' ? Math.sin((index * 2 * Math.PI) / 3) * 120 :
              Math.sin((index * 2 * Math.PI) / 3) * 220
        }))
      };
      setGraphData(enhancedData);
    } else {
      setGraphData(data);
    }
  }, [data]);

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
    
    // Center on clicked node
    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(1.5, 500);
    }
  };

  const handleNodeHover = (node: NetworkNode | null) => {
    setHoveredNode(node);
  };

  const handleZoomIn = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() * 1.5, 500);
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() * 0.75, 500);
    }
  };

  const handleReset = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
      setSelectedNode(null);
    }
  };

  const getNodeSize = (node: NetworkNode) => {
    const baseSize = node.type === 'company' ? node.size + 4 : node.size;
    return selectedNode?.id === node.id ? baseSize * 1.2 : baseSize;
  };

  const getLinkWidth = (link: NetworkLink) => {
    const baseWidth = Math.max(1, (link.strength / 100) * 3);
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    if (selectedNode && (selectedNode.id === sourceId || selectedNode.id === targetId)) {
      return baseWidth * 1.3;
    }
    return baseWidth;
  };

  const getLinkColor = (link: NetworkLink) => {
    switch (link.type) {
      case 'warm_introduction':
        return '#059669';
      case 'direct_connection':
        return '#2563EB';
      case 'co_investment':
        return '#7C3AED';
      case '2nd_degree':
        return '#D97706';
      case 'investment':
        return '#DC2626';
      case 'professional':
        return '#6B7280';
      default:
        return '#9CA3AF';
    }
  };

  const getLinkOpacity = (link: NetworkLink) => {
    const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
    const targetId = typeof link.target === 'object' ? link.target.id : link.target;
    
    if (selectedNode && (selectedNode.id === sourceId || selectedNode.id === targetId)) {
      return 0.95;
    }
    return selectedNode ? 0.15 : 0.7;
  };

  const nodeCanvasObject = (node: NetworkNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = Math.max(8, 11 / globalScale);
    const isSelected = selectedNode?.id === node.id;
    const isHovered = hoveredNode?.id === node.id;
    const nodeSize = getNodeSize(node);
    
    // Create gradient for nodes
    const gradient = ctx.createRadialGradient(
      node.x! - nodeSize * 0.3, 
      node.y! - nodeSize * 0.3, 
      0, 
      node.x!, 
      node.y!, 
      nodeSize
    );
    
    // Different gradients for different node types
    if (node.type === 'company') {
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, node.color);
    } else if (node.type === 'investor') {
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(0.7, node.color);
      gradient.addColorStop(1, d3.color(node.color)?.darker(0.5)?.toString() || node.color);
    } else {
      gradient.addColorStop(0, '#FFFFFF');
      gradient.addColorStop(1, node.color);
    }
    
    // Draw shadow for depth
    if (isSelected || isHovered) {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
    }
    
    // Draw node circle with gradient
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, nodeSize, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add elegant border
    if (isSelected) {
      ctx.strokeStyle = '#1F2937';
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Add outer glow ring
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, nodeSize + 4, 0, 2 * Math.PI);
      ctx.strokeStyle = node.color + '40'; // Add transparency
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (isHovered) {
      ctx.strokeStyle = '#374151';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.strokeStyle = '#E5E7EB';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    if (isSelected || isHovered) {
      ctx.restore();
    }
    
    // Draw label
    ctx.save();
    ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#111827';
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    
    const labelY = node.y! + nodeSize + 14;
    ctx.strokeText(label, node.x!, labelY);
    ctx.fillText(label, node.x!, labelY);
    
    // Draw company name for investors
    if (node.company && node.type === 'investor') {
      ctx.font = `${fontSize - 1}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.fillStyle = '#6B7280';
      const companyY = node.y! + nodeSize + 26;
      ctx.strokeText(node.company, node.x!, companyY);
      ctx.fillText(node.company, node.x!, companyY);
    }
    
    // Draw fit score for investors
    if (node.fitScore && node.type === 'investor' && (isSelected || isHovered)) {
      ctx.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.fillStyle = '#059669';
      const scoreY = node.y! + nodeSize + 38;
      ctx.strokeText(`${node.fitScore}%`, node.x!, scoreY);
      ctx.fillText(`${node.fitScore}%`, node.x!, scoreY);
    }
    
    ctx.restore();
  };

  const linkCanvasObject = (link: NetworkLink, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const sourceNode = typeof link.source === 'object' ? link.source : graphData.nodes.find(n => n.id === link.source);
    const targetNode = typeof link.target === 'object' ? link.target : graphData.nodes.find(n => n.id === link.target);
    
    if (!sourceNode || !targetNode) return;

    const linkWidth = getLinkWidth(link);
    const linkColor = getLinkColor(link);
    const linkOpacity = getLinkOpacity(link);
    
    ctx.save();
    ctx.globalAlpha = linkOpacity;

    // Draw curved link for more elegance
    const dx = targetNode.x! - sourceNode.x!;
    const dy = targetNode.y! - sourceNode.y!;
    const dr = Math.sqrt(dx * dx + dy * dy);
    
    // Calculate curve control point
    const curvature = 0.3;
    const midX = (sourceNode.x! + targetNode.x!) / 2;
    const midY = (sourceNode.y! + targetNode.y!) / 2;
    const cpX = midX + (dy * curvature);
    const cpY = midY - (dx * curvature);
    
    // Draw elegant curved path
    ctx.beginPath();
    ctx.moveTo(sourceNode.x!, sourceNode.y!);
    ctx.quadraticCurveTo(cpX, cpY, targetNode.x!, targetNode.y!);
    
    // Add gradient to links
    const linkGradient = ctx.createLinearGradient(
      sourceNode.x!, sourceNode.y!, 
      targetNode.x!, targetNode.y!
    );
    linkGradient.addColorStop(0, linkColor + '80');
    linkGradient.addColorStop(0.5, linkColor);
    linkGradient.addColorStop(1, linkColor + '80');
    
    ctx.strokeStyle = linkGradient;
    ctx.lineWidth = linkWidth;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Draw elegant strength indicator and label
    if ((hoveredNode && (hoveredNode.id === sourceNode.id || hoveredNode.id === targetNode.id)) || 
        (selectedNode && (selectedNode.id === sourceNode.id || selectedNode.id === targetNode.id))) {
      
      // Background for label
      const labelPadding = 8;
      const strengthText = `${link.strength}%`;
      const labelText = link.label;
      
      ctx.font = `${Math.max(8, 10 / globalScale)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.textAlign = 'center';
      
      const strengthWidth = ctx.measureText(strengthText).width;
      const labelWidth = ctx.measureText(labelText).width;
      const maxWidth = Math.max(strengthWidth, labelWidth);
      
      // Draw background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(
        cpX - maxWidth/2 - labelPadding, 
        cpY - 15, 
        maxWidth + labelPadding * 2, 
        30, 
        6
      );
      ctx.fill();
      ctx.stroke();
      
      // Draw text
      ctx.fillStyle = '#059669';
      ctx.font = `bold ${Math.max(8, 10 / globalScale)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.fillText(strengthText, cpX, cpY - 4);
      
      ctx.fillStyle = '#374151';
      ctx.font = `${Math.max(7, 8 / globalScale)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
      ctx.fillText(labelText, cpX, cpY + 8);
    }
    
    ctx.restore();
  };

  return (
    <Card className={isFullscreen ? 'fixed inset-4 z-50' : ''}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Network className="h-5 w-5 mr-2" />
            {title}
          </CardTitle>
          {showControls && (
            <div className="flex items-center space-x-1 lg:space-x-2">
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            width={isFullscreen ? window.innerWidth - 100 : Math.min(window.innerWidth - 320, 1200)}
            height={isFullscreen ? window.innerHeight - 200 : height}
            nodeCanvasObject={nodeCanvasObject}
            linkCanvasObject={linkCanvasObject}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            enableNodeDrag={layout === 'force'}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            cooldownTicks={layout === 'static' ? 0 : 300}
            warmupTicks={layout === 'static' ? 0 : 100}
            backgroundColor="rgba(255, 255, 255, 0)"
            linkCurvature={0.3}
            nodeRelSize={6}
            linkDirectionalParticles={title.includes('Coalition') ? 2 : 0}
            linkDirectionalParticleSpeed={0.006}
            linkDirectionalParticleWidth={1.5}
          />
          
          {/* Legend */}
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 lg:p-4 border border-gray-200 shadow-lg max-w-40">
            <h4 className="font-medium text-black mb-2 text-sm">Legend</h4>
            <div className="space-y-1 text-xs leading-tight">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-sm"></div>
                <span className="text-xs">Company</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-sm"></div>
                <span className="text-xs">Investors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-sm"></div>
                <span className="text-xs">Connectors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                <span className="text-xs">Warm Path</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <span className="text-xs">Direct</span>
              </div>
            </div>
          </div>

          {/* Node Details */}
          {selectedNode && (
            <div className="absolute top-4 right-4 bg-white/97 backdrop-blur-md rounded-xl p-4 border border-gray-200 shadow-xl w-64 max-w-xs">
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-5 h-5 rounded-full shadow-sm" 
                  style={{ 
                    background: `linear-gradient(135deg, ${selectedNode.color}40, ${selectedNode.color})` 
                  }}
                ></div>
                <div>
                  <h4 className="font-semibold text-black">{selectedNode.name}</h4>
                  {selectedNode.company && (
                    <p className="text-sm text-gray-600">{selectedNode.company}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2 text-xs lg:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <Badge variant="outline" className="text-xs">
                    {selectedNode.type.replace('_', ' ')}
                  </Badge>
                </div>
                
                {selectedNode.fitScore && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fit Score:</span>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      {selectedNode.fitScore}%
                    </Badge>
                  </div>
                )}
                
                {selectedNode.investment && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-medium">{selectedNode.investment}</span>
                  </div>
                )}
                
                {selectedNode.relationship && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Relationship:</span>
                    <span className="font-medium text-xs">{selectedNode.relationship}</span>
                  </div>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 hover:bg-gray-50 text-xs"
                onClick={() => setSelectedNode(null)}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}