import { DatePicker, Modal } from "antd";
import React from "react";

interface BookingModalProps {
  title: string;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  setBookingDate: (date: Date | null) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  title,
  visible,
  onOk,
  onCancel,
  setBookingDate,
}) => {
  const handleDateChange = (date: any, dateString: string) => {
    setBookingDate(date ? date.toDate() : null); // Convert Dayjs to Date
  };

  return (
    <Modal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <h3 className="mb-2">Service Name : {title}</h3>
      <DatePicker onChange={handleDateChange} />
    </Modal>
  );
};

export default BookingModal;
