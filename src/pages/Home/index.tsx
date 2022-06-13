import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddressInput from "../../components/AddressInput";
import TableRow from "../../components/TableRow";
import { fetchSimilarAddresses } from "../../services/address";
import { RootState, useAppDispatch } from "../../store";
import { fetchCurrentCastByLocation } from "../../store/weatherCastReducer";

const Home = () => {
  const dispatch = useAppDispatch();
  const { list } = useSelector((state: RootState) => state.weatherCast);

  const [search, setSearch] = useState<string>("");
  const [addresses, setAddresses] = useState<
    { value: string; label: string }[]
  >([]);
  const [address, setAddress] = useState<string>();

  const fetchAdddresses = async () => {
    // Get Location data by search query
    const res = await fetchSimilarAddresses(search);
    if (res && res.length > 0) {
      setAddresses(
        res.map((el) => {
          return {
            value: JSON.stringify({
              lat: el.metadata?.latitude,
              lon: el.metadata?.longitude,
            }),
            label: `${el.delivery_line_1} ${el.last_line}`,
          };
        })
      );
    }
  };

  useEffect(() => {
    if (search !== "") {
      fetchAdddresses();
    }
  }, [search]);

  useEffect(() => {
    if (address) {
      dispatch(fetchCurrentCastByLocation(JSON.parse(address)));
    }
  }, [address])

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Weather Cast</h1>
          {address && <p>Weather Cast for {address}</p>}
        </div>
        <AddressInput
          search={search}
          addresses={addresses}
          onAddressChange={handleAddressChange}
          onClickItem={(obj: { value: string; label: string }) => {
            setSearch(obj.label);
            setAddress(obj.value);
          }}
        />
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                    >
                      DateTime
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Weather
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Wind Speed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {list.map((el: any) => (<TableRow obj={el} key={el.dt} />))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
