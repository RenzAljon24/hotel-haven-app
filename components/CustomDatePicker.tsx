import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { images } from '@/constants';
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
                <Text className='text-xl text-slate-500 px-4 border border-gray-500 rounded-md font-plight'>
                <FontAwesome name="calendar" size={20} color="gray" /> {label}
                </Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 justify-center   bg-opacity-80">
                    <View className="bg-white mx-4 p-4 rounded-lg">
                        <View className='flex mx-auto items-center m-2'>
                            <Image 
                            source={images.logo}
                            className='w-24 h-10'
                            />
                        </View>
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
                        
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                textSectionTitleDisabledColor: '#d9e1e8',
                                selectedDayBackgroundColor: '#15A86D',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#15A86D',
                                dayTextColor: '#2d4150',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#15A86D',
                                selectedDotColor: '#ffffff',
                                arrowColor: '#15A86D',
                                disabledArrowColor: '#d9e1e8',
                                monthTextColor: '#15A86D',
                                indicatorColor: '#15A86D',
                                textDayFontSize: 16,
                                textMonthFontSize: 20,
                                textDayHeaderFontSize: 14
                            }}
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