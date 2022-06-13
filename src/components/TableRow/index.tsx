const TableRow = ({ obj }: { obj: any }) => {
  return (
    <tr>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
        {new Date(obj.dt).toDateString()}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {obj.weather?.[0]?.description}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {obj.wind_speed}
      </td>
    </tr>
  );
};

export default TableRow;
