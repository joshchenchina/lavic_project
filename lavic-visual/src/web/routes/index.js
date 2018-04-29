/**
 * Author: Yizhong Chen
 * Date: Apr.28th.2018
 * Description: Configuring all front-end routing, centralized processing data
 */

import React from 'react';
import {ConnectedRouter} from 'react-router-redux';
import Routes from './Routes';

function router(history) {
	return (
		<ConnectedRouter history={history}>
			<Routes/>
		</ConnectedRouter>
	);
}
export default router;
