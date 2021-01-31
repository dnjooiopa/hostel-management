export const BookingDetail = ({ booking }) => {
  return (
    <div className="rounded p-6 m-2">
      <div>check-in: {booking.check_in_date}</div>
      <div>check-out: {booking.check_out_date}</div>
    </div>
  )
}
