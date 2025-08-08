function ChargesForAccountOpening() {
    return ( 
        <div>
            <h1>Charges for account opening</h1>
            <table>
                <tr>
                    <th>Type of account</th>
                    <th>Charges</th>
                </tr>
                <tr>
                    <td>Online account</td>
                    <td>
                        <button type="button">Free</button>
                    </td>
                </tr>
                <tr>
                    <td>Offline account</td>
                    <td>
                        <button type="button">Free</button>
                    </td>
                </tr>
                <tr>
                    <td>NRI account (offline only)</td>
                    <td>₹ 500</td>
                </tr>
                <tr>
                    <td>Partnership, LLP, HUF, or Corporate accounts (offline only)</td>
                    <td>₹ 500</td>
                </tr>
            </table>
        </div>
     );
}

export default ChargesForAccountOpening;