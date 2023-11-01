import React from 'react';
import {LogBox, ScrollView} from 'react-native';
import {Item} from './NestedListItem';

// LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreAllLogs();

type NestedListViewProp = {
  items: any;
  updateActiveSection: any;
  isNodeActive: any;
  childrenPath: any;
  // headerView?: any;
  // contentView?: any;
  opacity: any;
  itemKey: any;
  keyboardShouldPersistTaps?: any;
};

export const NestedListView = ({
  items,
  updateActiveSection,
  isNodeActive,
  childrenPath,
  // headerView,
  // contentView,
  opacity,
  itemKey,
  keyboardShouldPersistTaps,
}: NestedListViewProp) => {
  const renderItem = (item: any) => (
    <Item
      key={itemKey(item)}
      item={item}
      updateActiveSection={updateActiveSection}
      isNodeActive={isNodeActive}
      childrenPath={childrenPath}
      // headerView={headerView}
      // contentView={contentView}
      opacity={opacity}
      itemKey={itemKey}
    />
  );

  return (
    <ScrollView
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      style={{marginBottom: 10}}>
      {items && items.map(renderItem)}
    </ScrollView>
  );
};
