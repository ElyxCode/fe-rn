import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View, LogBox} from 'react-native';
import {NestedListView} from './NestedListView';

// LogBox.ignoreLogs(["Require cycle:"]);
LogBox.ignoreAllLogs();

type NestedListExtProps = {
  listItems: any;
  defaultView: any;
  listWrapperStyle: any;
  childrenPath: any;
  headerView?: any;
  contentView?: any;
  opacity: any;
  onItemPressed: any;
  onLastItemPressed: any;
  itemKey: any;
  keyboardShouldPersistTaps?: any;
};

export const NestedListExt = ({
  listItems,
  defaultView = 'collapsed',
  listWrapperStyle,
  childrenPath = 'childs',
  headerView,
  contentView,
  opacity,
  onItemPressed = (item: any) => {},
  onLastItemPressed = (item: any) => {},
  itemKey,
  keyboardShouldPersistTaps = 'never',
}: NestedListExtProps) => {
  const [activeSections, setActiveSections] = useState([]);

  useEffect(() => {
    defaultView === 'expanded' && setActiveSections(listItems);
  }, []);

  const updateActiveSection = (item: any) => {
    if (!item[childrenPath] || item[childrenPath].length < 1) {
      onLastItemPressed(item);
    } else {
      let newSelections: any = [...activeSections];
      const activeElement = isNodeActive(item);
      if (activeElement) {
        newSelections = [
          ...searchForChildrenToRemove(newSelections, activeElement),
        ];
      } else {
        newSelections.push(item as never);
      }
      setActiveSections(newSelections);
    }
    onItemPressed(item);
  };

  function searchForChildrenToRemove(newSelections: any, elementToRemove: any) {
    var index = newSelections.indexOf(elementToRemove);
    if (index !== -1) {
      newSelections.splice(index, 1);
      if (newSelections.length && elementToRemove[childrenPath]) {
        elementToRemove[childrenPath].forEach((child: any) => {
          if (isNodeActive(child)) {
            searchForChildrenToRemove(newSelections, child);
          }
        });
      }
    }
    return newSelections;
  }

  function isNodeActive(item: any) {
    return activeSections.find(element => element === item);
  }

  return (
    <>
      {listItems && (
        <View style={listWrapperStyle}>
          <NestedListView
            items={listItems}
            updateActiveSection={updateActiveSection}
            isNodeActive={isNodeActive}
            childrenPath={childrenPath}
            // headerView={headerView}
            // contentView={contentView}
            opacity={opacity}
            itemKey={itemKey}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          />
        </View>
      )}
    </>
  );
};
