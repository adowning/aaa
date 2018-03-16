<template>
  <q-table
    title="Assets"
    :data="serverData"
    :columns="columns"
        :loading="loading"

  >
   <q-tr slot="body" slot-scope="props" :props="props">
             <q-td key="id" :props="props"></q-td>
      
             <q-td key="asset_tag" :props="props">{{ props.row.asset_tag }}</q-td>

         <q-td key="model" :props="props">{{ props.row.model }}</q-td>
        <q-td key="category" :props="props">{{ props.row.category }}
       
        </q-td>
        <!-- <q-td key="status_label" :props="props">{{ props.row.status_label }}</q-td> -->
        <q-td key="assigned_to" :props="props">{{ props.row.assigned_to }}</q-td>
        <q-td key="location" :props="props">{{ props.row.location }}</q-td>
        <q-td key="available_actions" :props="props"></q-td>
  
           <q-td key="asdf" :props="props">
          <div class="row items-center justify-between no-wrap">
			  
            <q-btn v-if="!props.row.assigned_to" size="sm"  small square color="amber" @click="checkOut(props.row.id, props.row.available_actions, props.row.assigned_to)" class="q-mr-xs" >Check Out</q-btn>
            <q-btn v-if="props.row.assigned_to" size="sm"  small square color="purple" @click="checkIn(props.row.id, props.row.available_actions, props.row.assigned_to)" class="q-mr-sm" >Check In</q-btn>
            <div>{{ props.row.calories }}</div>
          </div>
           </q-td>
   </q-tr>
  </q-table>
</template>

<script>
export default {
	data: () => ({
		loading: false,
		serverPagination: {
			page: 1,
			//rowsNumber: 10, // specifying this determines pagination is server-side
		},
		columns: [
			// {
			// 	name: "desc",
			// 	required: true,
			// 	label: "Desser",
			// 	align: "left",
			// 	field: "name",
			// 	// sortable: true
			// },

			{
				name: "id",
				label: "",
				field: "id",
				align: "left",
				visible: false,

				// callback: 'linkFormatter'
			},
			{
				name: "asset_tag",
				label: "Asset",
				field: "asset_tag",
				align: "left",

				// callback: 'linkFormatter'
			},

			// {
			// 	label: "Serial",
			// 	name: "serial",
			// 	align: "left",

			// 	field: "serial",
			// },
			{
				label: "Model",
				name: "model",
				align: "left",

				field: "model",
			},
			{
				label: "Category",
				name: "category",
				align: "left",

				field: "category",
			},
			// {
			// 	label: "Status",
			// 	name: "status_label",
			// 	align: "left",

			// 	field: "status_label",
			// },
			{
				label: "Assigned To",
				name: "assigned_to",
				align: "left",

				field: "assigned_to",
			},
			{
				label: "Location",
				name: "location",
				align: "left",

				field: "location",
			},
			//         {
			//   title: 'Checkin/Checkout',
			//   name: 'status_label',
			//    callback: 'checkincheckout'
			// },
			{
				name: "__slot:actions",
				// label: "Actions2",
				align: "left",

				titleClass: "center aligned",
				dataClass: "center aligned",
			},
			{
				name: "available_actions",
				label: "",
				align: "left",
				//field: "available_actions",
				visible: false,
				titleClass: "center aligned",
				dataClass: "center aligned",
			},
			{
				name: "asdf",
				label: "",
				align: "left",
				//field: "available_actions",
				// visible: false,
				titleClass: "center aligned",
				dataClass: "center aligned",
			},
			// {
			// 	name: "__component:custom-actions",
			// 	label: "Actions",
			// 	align: "left",

			// 	titleClass: "center aligned",
			// 	dataClass: "center aligned",
			// },
		],
		serverData: [],
	}),
	methods: {
		checkIn(assetId, actions, assigned_to) {
		
			if (!actions.checkin || !assigned_to) {
				console.log("not gonna hapn capnxxx")
				return
			}
			this.$snipeit
			  .post("hardware/checkin", {assigned_asset: assetId,})
				.then(response => {
					console.log(response)
					this.selected = null
					this.$router.go(this.$router.currentRoute)					
					// this.request(20, 0)
				})
				.catch(e => {
					console.log(e)
				})
		},
		checkOut(assetId, actions, assigned_to) {
			if (!actions.checkout || assigned_to) {
				console.log("not gonna hapn capn")
				return
			}

			this.$snipeit
				.post("hardware/" + assetId + "/checkout", {
					assigned_user: 1,
					assigned_asset: assetId,
				})
				.then(response => {
					console.log(response)
					this.selected = null
					this.$router.go(this.$router.currentRoute)
					// this.request(20, 0)
				})
				.catch(e => {
					console.log(e)
				})
		},
		request({ pagination, filter }) {
			// we set QTable to "loading" state
			console.log('updating')
			this.loading = true
			// we do the server data fetch, based on pagination and filter received
			// (using Axios here, but can be anything; parameters vary based on backend implementation)

			this.$snipeit
				.get("hardware")
				.then(({ data }) => {
					// updating pagination to reflect in the UI
					this.serverPagination = pagination

					// we also set (or update) rowsNumber
					this.serverPagination.rowsNumber = data.rowsNumber
					for (var item of data.rows) {
						item.model = item.model.name
						item.category = item.category.name
						if (item.location) {
							item.location = item.location.name
						}
						if (item.status_label) {
							item.status_label = item.status_label.name
						}
						if (item.assigned_to) {
							item.assigned_to = item.assigned_to.name
						}
						console.log(item.available_actions.length)

						// for(var action of item.available_actions){
						//     console.log(action)
						// }
					}
					console.log(data.rows)
					// then we update the rows with the fetched ones
					this.serverData = data.rows

					// finally we tell QTable to exit the "loading" state
					this.loading = false
				})
				.catch(error => {
					// there's an error... do SOMETHING

					// we tell QTable to exit the "loading" state
					this.loading = false
				})
		},
	},
	mounted() {
		// once mounted, we need to trigger the initial server data fetch
		this.request({
			pagination: this.serverPagination,
			filter: this.filter,
		})
	},
}
</script>