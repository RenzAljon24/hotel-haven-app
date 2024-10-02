import { TextInputProps, TouchableOpacityProps } from "react-native";



declare interface ButtonProps extends TouchableOpacityProps {
    title: string;
    bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
    textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
    IconLeft?: React.ComponentType<any>;
    IconRight?: React.ComponentType<any>;
    className?: string;
  }
  
  declare interface InputFieldProps extends TextInputProps {
    label: string;
    icon?: any;
    secureTextEntry?: boolean;
    labelStyle?: string;
    containerStyle?: string;
    inputStyle?: string;
    iconStyle?: string;
    className?: string;
  }


  export interface Room {
    id: number;
    room_number: number;
    type: string;
    availability: number;
    image: string;
    description: string; 
    price: any;
  }
  
  export type RootStackParamList = {
    RoomDetails: { id: number };
    Reservation: { roomId: number};
  };