/*
	The schedule generation algorithm described below is NOT optimal (it is polynomial,
	but under certain cases will not generate the best solution), 

	This problem represents a generalization of the Knapsack problem that is well known to be NP hard
	Thus an efficient (polynomial) solution to this problem is unlikely to exist

	This solution does have the downside of not balancing the workload evenly  (I think that I could 
	try to balance out the order queues wiht the help of a min heap for each baker although there is a lot left
	to be said)

	There is a solution to this problem that uses Linear Optimization that will yield the best answer,
	I have chosen not to implement it due to the 3 hour time limit(I beilieve that it is exponential in theory, but
	fast in practice). I will describe this in part 2.


*/


const generate_schedule = (orders,bakers) => {

	//Get the actual orders
	const orders_copy = [...Object.values(orders)]

	//Sort the orders in decreasing order of the weight
	orders_copy.sort((a,b) => a.duration < b.duration? 1 : -1);

	const ids = orders_copy.map(order => order.id);

	//array of flags to tell us if an order has already been assigned
	const is_assigned = {}
	orders_copy.forEach(order => is_assigned[order.id] = false);

	//For each baker, we keep track of the remaining capacity (work hours) as well as a queue
	const schedule = {}
	bakers.forEach(baker => schedule[baker] = {capacity:8, queue:[]});

	//We iterate over bakers and greedily choose the largest duration orders first (we sorted in decreasig order earlier)
	
	for(baker of bakers){
		for(id of ids){
			//If an order is not assigned and there is sufficient capqacity, we choose it
			if (!is_assigned[id]){
				const {duration} = orders[id];
				if(duration <= schedule[baker].capacity){
					is_assigned[id] = true;
					schedule[baker].capacity -= duration;
					schedule[baker].queue.push(orders[id]);
				}
			}
			

		}
	}

	for(flag of Object.values(is_assigned)){
		if (!flag){
			//If we couldn't add some order, we cannot use the newly added item
			return null;
		}
	}

	return schedule;
}

exports.generate_schedule = generate_schedule;