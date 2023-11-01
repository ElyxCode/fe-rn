import React from 'react';
import {LogBox, TouchableOpacity, Text, View} from 'react-native';

import {NestedListView} from './NestedListView';
import {CategoryItem} from '../CategoryItem';

// LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreAllLogs();

type NestedListItemProps = {
  item: any;
  isNodeActive: any;
  updateActiveSection: any;
  childrenPath: any;
  // headerView?: any;
  // contentView?: any;
  opacity: any;
  itemKey: any;
};

export const Item = ({
  item,
  isNodeActive,
  updateActiveSection,
  childrenPath,
  // headerView,
  // contentView,
  opacity,
  itemKey,
}: NestedListItemProps) => {
  return (
    <>
      {/* <TouchableOpacity
        onPress={() => {
          updateActiveSection(item);
        }}
        activeOpacity={opacity}>
        <View>
          {item.type === 'header' ? headerView(item) : contentView(item)}
        </View>
      </TouchableOpacity> */}
      <CategoryItem item={item} updateActiveSection={updateActiveSection} />
      {item[childrenPath] && isNodeActive(item) && (
        <NestedListView
          items={item[childrenPath]}
          updateActiveSection={updateActiveSection}
          isNodeActive={isNodeActive}
          childrenPath={childrenPath}
          // headerView={headerView}
          // contentView={contentView}
          opacity={opacity}
          itemKey={itemKey}
        />
      )}
    </>
  );
};
