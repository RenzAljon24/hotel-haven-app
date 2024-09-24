
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  RoomList: undefined;
  RoomDetails: { id: number };
  Reservation: {roomId: number}
};


