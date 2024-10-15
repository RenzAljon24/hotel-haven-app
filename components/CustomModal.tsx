// CustomModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons'; // Import the icons library

interface CustomModalProps {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, message, type, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white p-6 rounded-lg w-4/5 items-center">
          {type === 'success' ? (
            <AntDesign name="checkcircle" size={50} color="green" className="mb-4" />
          ) : (
            <MaterialIcons name="error" size={50} color="red" className="mb-4" />
          )}
          <Text className="text-lg font-bold text-center mb-4">{message}</Text>
          <TouchableOpacity
            onPress={onClose}
            className=""
          >
            <Text className="text-white text-center text-lg bg-green-600 py-3 px-6 rounded-md w-72">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
