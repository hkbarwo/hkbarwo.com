import React from "react";
import { FormattedMessage } from "react-intl";

export default function TheatersList(props) {
  return (
    <div className={props.className}>
      <table className="w-full">
        <thead className="text-secondary text-20 font-bold">
          <tr className="grid grid-cols-4 gap-x-10">
            <td>
              <FormattedMessage id="theater.list.header.title" />
            </td>
            <td>
              <FormattedMessage id="theater.list.header.type" />
            </td>
            <td>
              <FormattedMessage id="theater.list.header.seats" />
            </td>
            <td>
              <FormattedMessage id="theater.list.header.tel" />
            </td>
          </tr>
        </thead>
        <tbody>
          {props.items.map((item, i) => (
            <tr
              key={i}
              className="my-10 grid grid-cols-4 gap-x-10"
            >
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>{item.seats}</td>
              <td>{item.tel}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
}
