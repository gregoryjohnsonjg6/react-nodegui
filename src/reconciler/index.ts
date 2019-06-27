import Reconciler from "react-reconciler";
import { NodeWidget, QWidget, FlexLayout } from "@nodegui/nodegui";
import { getComponent } from "../components/config";

//@ts-ignore
const HostConfig: Reconciler.HostConfig<
  string,
  object,
  QWidget,
  NodeWidget,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
> = {
  //TODO We will specify all required methods here
  now: Date.now,
  getRootHostContext: function(nextRootInstance) {
    let context = {
      name: "rootnode"
    };
    return context;
  },
  getChildHostContext: function(parentContext, fiberType, rootInstance) {
    const { getContext } = getComponent(fiberType);
    return getContext(parentContext, rootInstance);
  },
  shouldSetTextContent: function(type, nextProps) {
    const { shouldSetTextContent } = getComponent(type);
    return shouldSetTextContent(nextProps);
  },
  createTextInstance: function(
    newText,
    rootContainerInstance,
    context,
    workInProgress
  ) {
    throw new Error(`Can't create text without <Text> for text: ${newText}`);
  },
  createInstance: function(
    type,
    newProps,
    rootContainerInstance,
    context,
    workInProgress
  ) {
    const { createInstance } = getComponent(type);
    return createInstance(
      newProps,
      rootContainerInstance,
      context,
      workInProgress
    );
  },
  appendInitialChild: function(parentInstance, child: NodeWidget) {
    let layout = parentInstance.layout;
    if (!layout) {
      const flexLayout = new FlexLayout();
      flexLayout.setFlexNode(parentInstance.getFlexNode());
      parentInstance.setLayout(flexLayout);
      layout = flexLayout;
    }
    layout.addWidget(child);
  },
  finalizeInitialChildren: function(
    instance,
    type,
    newProps,
    rootContainerInstance,
    context
  ) {
    const { finalizeInitialChildren } = getComponent(type);
    return finalizeInitialChildren(
      instance,
      newProps,
      rootContainerInstance,
      context
    );
  },
  prepareForCommit: function(rootNode) {
    console.log("prepareForCommit", {
      root: rootNode.constructor.name
    });
  },
  resetAfterCommit: function(rootNode) {
    console.log("resetAfterCommit", {
      root: rootNode.constructor.name
    });
  },
  supportsMutation: true
};

export default Reconciler(HostConfig);
