import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

interface CustomCalendarPickerProps {
    bookedDates: { start: Date, end: Date }[];
    selectedDate?: Date | null;
    onDateChange: (date: Date) => void;
    minimumDate?: Date;
    label: string;
}

const CustomCalendarPicker: React.FC<CustomCalendarPickerProps> = ({
                                                                       bookedDates,
                                                                       selectedDate,
                                                                       onDateChange,
                                                                       minimumDate,
                                                                       label,
                                                                   }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const getDisabledDates = () => {
        const disabledDates: { [key: string]: {} } = {};

        bookedDates.forEach(booking => {
            let currentDate = moment(booking.start);

            while (currentDate <= moment(booking.end)) {
                disabledDates[currentDate.format('YYYY-MM-DD')] = {
                    disabled: true,
                    disableTouchEvent: true,
                    color: 'gray',
                };
                currentDate = currentDate.add(1, 'day');
            }
        });

        return disabledDates;
    };

    const handleDayPress = (day: any) => {
        const selectedMoment = moment(day.dateString);

        const isDisabled = bookedDates.some(booking =>
            selectedMoment.isBetween(booking.start, booking.end, undefined, '[]')
        );

        if (isDisabled) {
            Alert.alert('Date Unavailable', 'The selected date is already booked. Please choose another date.');
        } else {
            onDateChange(new Date(day.timestamp));
            
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text className='text-xl text-slate-500 px-4 border border-gray-500 rounded-md font-plight'>{label}</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center  bg-opacity-80">
                    <View className="bg-white mx-4 p-4 rounded-lg">
                        <Calendar
                            onDayPress={handleDayPress}
                            markedDates={{
                                ...getDisabledDates(),
                                ...(selectedDate
                                        ? { [moment(selectedDate).format('YYYY-MM-DD')]: { selected: true, selectedColor: '#15A86D' } }
                                        : {}
                                ),
                            }}
                            minDate={minimumDate ? moment(minimumDate).format('YYYY-MM-DD') : undefined}
                        />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text className="text-center mt-4 bg-[#15A86D] text-white font-pblack p-2 rounded">Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default CustomCalendarPicker;