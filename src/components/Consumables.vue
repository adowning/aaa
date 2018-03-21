<template>
  <q-table
    title="Consumables"
    :data="serverData"
    :columns="columns"
        :loading="loading"

  >
   <q-tr slot="body" slot-scope="props" :props="props">

        <q-td key="id" :props="props"></q-td>
        <q-td key="category" :props="props">{{ props.row.category.name }}</q-td>
       <q-td key="qty" :props="props">{{ props.row.qty }}</q-td> 
        <q-td key="remaining" :props="props">{{ props.row.remaining }}</q-td> 
        <q-td key="min_amt" :props="props">{{ props.row.min_amt }}</q-td>
        <q-td key="location" :props="props">{{ props.row.location.name }}</q-td>
            <q-btn v-if="!props.row.assigned_to" size="sm"  small square color="amber" @click="checkOut(props.row.id, props.row.available_actions, props.row.assigned_to)" class="q-mr-xs" >Check Out</q-btn>
        
   </q-tr>
  </q-table>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    serverPagination: {
      page: 1
    },
    columns: [
      {
        name: "id",
        label: "",
        field: "id",
        align: "left",
        visible: false
      },
      {
        label: "Category",
        name: "category",
        align: "left",
        field: "category"
      },
      {
        label: "Qty",
        name: "qty",
        field: "qty"
      },
      {
        label: "Remaining",
        name: "remaining",
        field: "remaining"
      },
      {
        label: "Minimum",
        name: "min_amt",
        field: "min_amt"
      },
      {
        label: "Location",
        name: "location",
        field: "location"
      }
    ],
    serverData: []
  }),
  methods: {
    checkOut(assetId, actions, assigned_to) {
      if (!actions.checkout || assigned_to) {
        console.log("not gonna hapn capn");
        return;
      }

      this.$snipeit
        .post("consumables/" + assetId + "/checkout", {
          assigned_user: 1,
          assigned_asset: assetId
        })
        .then(response => {
          console.log(response);
          this.selected = null;
          this.$router.go(this.$router.currentRoute);
          // this.request(20, 0)
        })
        .catch(e => {
          console.log(e);
        });
    },
    request({ pagination, filter }) {
      console.log("updating");
      this.loading = true;

      this.$snipeit
        .get("consumables")
        .then(({ data }) => {
          console.log(data.rows);
          this.serverPagination = pagination;
          this.serverPagination.rowsNumber = data.rowsNumber;

          this.serverData = data.rows;

          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
        });
    }
  },
  mounted() {
    // once mounted, we need to trigger the initial server data fetch
    this.request({
      pagination: this.serverPagination,
      filter: this.filter
    });
  }
};
</script>