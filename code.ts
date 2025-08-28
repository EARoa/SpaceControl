interface ResizeData {
  targetWidth: number;
  itemCount: number;
  padding: number;
}

interface PluginMessage {
  type: 'resize-elements';
  data: ResizeData;
}

interface UIMessage {
  type: 'error' | 'success';
  message: string;
}

figma.showUI(__html__, {
  width: 320,
  height: 400,
  title: 'SpaceControl 🚀'
});

figma.ui.onmessage = (msg: PluginMessage) => {
  if (msg.type === 'resize-elements') {
    resizeElements(msg.data);
  }
};

function resizeElements(data: ResizeData): void {
  const { targetWidth, itemCount, padding } = data;
  
  try {
    const selection: readonly SceneNode[] = figma.currentPage.selection;
  
    if (selection.length === 0) {
      sendUIMessage('error', 'Please select some elements to resize');
      return;
    }
    
    if (selection.length !== itemCount) {
      sendUIMessage('error', `You selected ${selection.length} items but specified ${itemCount} items`);
      return;
    }
    
    const totalPadding: number = padding * (itemCount - 1);
    const availableWidth: number = targetWidth - totalPadding;
    const itemWidth: number = availableWidth / itemCount;
    
    if (itemWidth <= 0) {
      sendUIMessage('error', 'Calculated width is too small. Reduce padding or increase target width.');
      return;
    }
    
    const sortedElements: SceneNode[] = [...selection].sort((a, b) => a.x - b.x);
    
    let currentX: number = sortedElements[0].x;
    
    sortedElements.forEach((element: SceneNode, index: number) => {
      if (isResizable(element)) {
        element.resize(itemWidth, element.height);
        
        element.x = currentX;
        
        currentX += itemWidth + padding;
      } else {
        sendUIMessage('error', `Cannot resize element "${element.name}" - it may be a group or component`);
        return;
      }
    });
    
    sendUIMessage('success', `Successfully resized ${itemCount} elements`);
    figma.notify(`Resized ${itemCount} elements to ${itemWidth.toFixed(1)}px each`);
    
  } catch (error) {
    console.error('Error resizing elements:', error);
    sendUIMessage('error', 'An error occurred while resizing elements');
  }
}

function isResizable(node: SceneNode): node is SceneNode & MinimalBlendMixin & LayoutMixin & GeometryMixin {
  return 'resize' in node && typeof node.resize === 'function';
}

function sendUIMessage(type: UIMessage['type'], message: string): void {
  figma.ui.postMessage({ type, message });
}

figma.on('close', () => {
});