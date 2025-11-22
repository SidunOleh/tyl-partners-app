import React, { useState, useRef, useContext } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from "react-native"
import css from "../../styles/css"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Arrow from "../../icons/Arrow"
import { useThemeStore } from "../../store/useThemeStore"
import Error from "./Error"

export default function Dropdown({ options, selectedValue, onValueChange, placeholder, label, error }) {
  const [ open, setOpen] = useState(false)
  const [ dropdownTop, setDropdownTop ] = useState(0)
  const [ dropdownLeft, setDropdownLeft ] = useState(0)
  const [ dropdownWidth, setDropdownWidth ] = useState(0)
  const toggleRef = useRef(null)
  const { theme } = useThemeStore()
  const insets = useSafeAreaInsets()

  const openDropdown = () => {
    if (toggleRef.current) {
      toggleRef.current.measure((fx, fy, width, height, px, py) => {
        const adjustedY = Platform.OS === "android" ? py - insets.top : py
        setDropdownTop(adjustedY + height + 5)
        setDropdownLeft(px)
        setDropdownWidth(width)
        setOpen(true)
      })
    }
  }

  const closeDropdown = () => setOpen(false)

  const selectedLabel = options.find(opt => opt.value === selectedValue)?.label

  return (
    <View>
      {label ? (
            <Text style={[styles.label, {color: css[theme].text}]}>
                {label}
            </Text>
        ) : null}
      <TouchableOpacity
        ref={toggleRef}
        style={[
          css.input,
          css[theme].input,
          styles.selectBox,
          {borderColor: open ? "#EC1220" : "transparent",}
        ]}
        activeOpacity={0.7}
        onPress={openDropdown}>
        <Text style={[{
            color: css[theme].input.color,
            fontSize: css[theme].input.fontSize,
        }]}>
          {selectedLabel || placeholder}
        </Text>
        <Arrow color="#EC1220" rotate={open ? "0deg" : "180deg"}/>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={[
            styles.modalOverlay,
          ]}>
            <View
              style={[
                styles.dropdown,
                {
                  top: dropdownTop,
                  left: dropdownLeft,
                  width: dropdownWidth,
                },
                {backgroundColor: css[theme].input.backgroundColor,}
              ]}>
              {options.length ? <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      {
                        borderBottomWidth: index == options.length-1 ? 0 : 1,
                        borderColor: theme == "dark" ? "#484848" : "#E6E6E6"
                      }
                    ]}
                    onPress={() => {
                      onValueChange(item.value)
                      closeDropdown()
                    }}>
                    <Text style={[
                      styles.optionText,
                      {
                        color: css[theme].text,
                      }
                    ]}>
                      {item.label}
                      </Text>
                  </TouchableOpacity>
                )}
              /> : <Text style={[styles.empty, {color: css[theme].text,}]}>Не знайдено</Text>}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {error?.length ? <Error text={error}/> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  selectBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },  
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dropdown: {
    position: "absolute",
    borderRadius: 5,
    maxHeight: 400,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  option: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 14,
  },
  empty: {
    paddingVertical: 10,
  },  
  label: {
      fontSize: 14,
      marginBottom: 5,
  },
})
