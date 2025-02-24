import { HeardBy } from "../components/HeardBy";
import { useGetNodesQuery, useGetTraceroutesQuery } from "../slices/apiSlice";

export const Traceroutes = () => {
  const { data: traceroutes } = useGetTraceroutesQuery();
  const { data: nodes } = useGetNodesQuery();

  if (!nodes) {
    return <div>Loading...</div>;
  }

  if (!traceroutes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h5 className="mb-2 text-gray-500">Traceroutes</h5>
      <h1 className="mb-2 text-xl">Traceroutes</h1>
      <p className="mb-2">
        Traceroutes as <HeardBy />
      </p>

      <table className="w-full max-w-full table-auto border-collapse border border-gray-500 bg-gray-50">
        <thead>
          <tr>
            <th className="p-1 border border-gray-500 bg-gray-400" align="left">
              Timestamp
            </th>
            <th className="p-1 border border-gray-500 bg-gray-400" align="left">
              From
            </th>
            <th className="p-1 border border-gray-500 bg-gray-400" align="left">
              To
            </th>
            <th className="p-1 border border-gray-500 bg-gray-400" align="left">
              Hops
            </th>
            <th className="p-1 border border-gray-500 bg-gray-400" align="left">
              Route
            </th>
            <th
              className="p-1 border border-gray-500 bg-gray-400 text-nowrap"
              align="left"
            >
              Route Hops
            </th>
          </tr>
        </thead>
        <tbody>
          {traceroutes?.map((item, index) => {
            const fnode = nodes[item.from];
            const tnode = nodes[item.to];

            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={`traceroute-${index}`}>
                <td className="p-1 border border-gray-400 text-nowrap">
                  {new Date(item.timestamp * 1000).toLocaleString()}
                </td>
                <td className="p-1 border border-gray-400">
                  {fnode ? (
                    <a href={`node_${item.from}.html`}>{fnode.shortname}</a>
                  ) : (
                    <span className="text-gray-500">UNK</span>
                  )}
                </td>
                <td className="p-1 border border-gray-400">
                  {tnode ? (
                    <a href={`node_${item.to}.html`}>{tnode.shortname}</a>
                  ) : (
                    <span className="text-gray-500">UNK</span>
                  )}
                </td>
                <td className="p-1 border border-gray-400" align="center">
                  {item.hops_away}
                </td>
                <td className="p-1 border border-gray-400">
                  {item.route_ids?.map((hop, hopIndex) => {
                    const hnode = nodes[hop];
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <span key={`hop-${hopIndex}`}>
                        {hnode ? (
                          <a href={`node_${hop}.html`}>{hnode.shortname}</a>
                        ) : (
                          <span className="text-gray-500">UNK</span>
                        )}
                        {hopIndex < (item.route_ids ?? []).length - 1 && (
                          <span className="text-gray-300"> &gt; </span>
                        )}
                      </span>
                    );
                  })}
                </td>
                <td className="p-1 border border-gray-400" align="center">
                  {item.route.length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
