import React from 'react';
import { View } from 'react-native';
import CustomCalendarPicker from '@/components/CustomDatePicker';
interface DatePickerProps {
    checkInDate: Date | null;
    checkOutDate: Date | null;
    handleCheckInChange: (date: Date) => void;
    handleCheckOutChange: (date: Date) => void;
    bookedDates: { start: Date; end: Date }[];
}

const DatePicker = ({ checkInDate, checkOutDate, handleCheckInChange, handleCheckOutChange, bookedDates }: DatePickerProps) => {
  return (
    <View className="flex flex-row mx-12 mt-10 gap-2">
      <CustomCalendarPicker
        label={checkInDate ? checkInDate.toLocaleDateString() : "Check in"}
        selectedDate={checkInDate}
        bookedDates={bookedDates}
        onDateChange={handleCheckInChange}
        minimumDate={new Date()}
      />
      <CustomCalendarPicker
        label={checkOutDate ? checkOutDate.toLocaleDateString() : "Check out"}
        selectedDate={checkOutDate}
        bookedDates={bookedDates}
        onDateChange={handleCheckOutChange}
        minimumDate={checkInDate || new Date()}
      />
    </View>
  );
};

export default DatePicker;
