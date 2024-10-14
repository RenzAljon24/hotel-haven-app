import { TextInputProps, TouchableOpacityProps } from "react-native";



  export interface Room {
    id: number;
    room_name: string;
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

  interface AuthContextType {
    user: User | null;
    signIn: (email: string, password: string) => void;
    signUp: (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        confirmPassword: string,
        profile?: string
    ) => void;
    signOut: () => void;
    makeReservation: (
        totalPrice: number,
        roomId: number,
        checkIn: string,
        checkOut: string
    ) => void;
    getUserTransactions: (
        check_in: string,
        check_out: string,
        total_price: number,
        room_image: string,
        status: string
    ) => Promise<any[]>; // Return type should be a promise of an array
    isLoading: boolean;
    error: string | null;
}


interface User {
  token: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile: string;
}