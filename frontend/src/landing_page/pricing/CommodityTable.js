function CommodityTable() {
    return ( 
        <table>
            <tr>
                <th></th>
                <th>Commodity futures</th>
                <th>Commodity options</th>
            </tr>
            <tr>
                <td>Brokerage</td>
                <td>0.03% or Rs. 20/executed order whichever is lower</td>
                <td>₹ 20/executed order</td>
            </tr>
            <tr>
                <td>STT/CTT</td>
                <td>0.01% on sell side (Non-Agri)</td>
                <td>0.05% on sell side</td>
            </tr>
            <tr>
                <td>Transaction charges</td>
                <td>MCX: 0.0021% <br />
                    NSE: 0.0001%</td>
                <td>MCX: 0.0418% <br />
                    NSE: 0.001%</td>
            </tr>
            <tr>
                <td>GST</td>
                <td>18% on (brokerage + SEBI charges + transaction charges)</td>
                <td>18% on (brokerage + SEBI charges + transaction charges)</td>
            </tr>
            <tr>
                <td>SEBI charges</td>
                <td>Agri: <br />
                    ₹1 / crore <br />
                    Non-agri: <br />
                    ₹10 / crore</td>
                <td>₹10 / crore</td>
            </tr>
            <tr>
                <td>Stamp charges</td>
                <td>0.002% or ₹200 / crore on buy side</td>
                <td>0.003% or ₹300 / crore on buy side</td>
            </tr>
        </table> 
    );
}

export default CommodityTable;