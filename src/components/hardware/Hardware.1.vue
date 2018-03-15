<template>
  <div>
    <filter-bar></filter-bar>
    <vuetable ref="vuetable"
      api-url="http://ramnode1.ashdevtools.com:8080/api/v1/hardware"
      :fields="fields"
      pagination-path=""
      :http-options="httpoptions"
      data-path="rows"
      :css="css.table"
      :sort-order="sortOrder"
      :multi-sort="true"
      detail-row-component="my-detail-row"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:pagination-data="onPaginationData"
    >
        <template slot="actions" slot-scope="props">   
      <!-- <div class="custom-actions"> -->
        <!-- <button class="ui basic button" v-if="props.rowData.assigned_to" 
          @click="onAction('view-item', props.rowData, props.rowIndex)">
          <i class="zoom icon"></i> -->
          <span  v-if="props.rowData.assigned_to">
        <button class="btn btn-sm bg-purple" data-tooltip="true" title="Check this item in so it is available for re-imaging, re-issue, etc." @click="onAction(props)"   >Checkin</button>
        <!-- </button> -->
        </span>
        <span v-else>
        <!-- <button class="btn btn-sm bg-purple" data-tooltip="true" title="Check this item in so it is available for re-imaging, re-issue, etc." @click="onAction(props)">Checkin</button> -->
 <button type="button" class="btn btn-sm bg-purple" data-toggle="modal" data-target="#modal-info" @click="onAction(props)">
                Launch Info Modal
              </button>
        </span>
       
      <!-- </div> -->
      </template>
       <template slot="actions2" slot-scope="props">
        <div class="custom-actions">
          <button class="ui basic button"
            @click="onAction('view-item', props.rowData, props.rowIndex)">
            <i class="zoom icon"></i>
          </button>
          <button class="ui basic button"
            @click="onAction('edit-item', props.rowData, props.rowIndex)">
            <i class="edit icon"></i>
          </button>
          <button class="ui basic button"
            @click="onAction('delete-item', props.rowData, props.rowIndex)">
            <i class="delete icon"></i>
          </button>
        </div>
      </template>
    </vuetable>
    <div class="vuetable-pagination">
      <vuetable-pagination-info ref="paginationInfo"
        info-class="pagination-info"
      ></vuetable-pagination-info>
      <vuetable-pagination ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
    <div class="modal modal-info fade" id="modal-info">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Info Modal</h4>
              </div>
              <div class="modal-body">
              <div class="form-group">
                  <label>Select</label>
                    <v-select v-model="selected" :options="options"></v-select>

                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-outline pull-left" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-outline"  data-dismiss="modal" @click="onAction2()">Save changes</button>
              </div>
            </div>
            <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
        </div>
  </div>
</template>

<script>

import accounting from 'accounting'
import moment from 'moment'
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import Vue from 'vue'
import VueEvents from 'vue-events'
import CustomActions from './CustomActions'
import DetailRow from './DetailRow'
import FilterBar from './FilterBar'
import axios from 'axios'
import vSelect from "vue-select"

var token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY4Zjg1MzAzNDlhMDhlNzAwODYyYzcwNDM5OTRjMDhhNTBlMWI2NGE0ZWYxNjA0NjM3ZjcwNjc4Y2QyYjViMmQyM2NmNTU0NzExYmMwNTg5In0.eyJhdWQiOiIxIiwianRpIjoiNjhmODUzMDM0OWEwOGU3MDA4NjJjNzA0Mzk5NGMwOGE1MGUxYjY0YTRlZjE2MDQ2MzdmNzA2NzhjZDJiNWIyZDIzY2Y1NTQ3MTFiYzA1ODkiLCJpYXQiOjE1MTQ1MzE4OTYsIm5iZiI6MTUxNDUzMTg5NiwiZXhwIjoxNTQ2MDY3ODk2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.dyzpV0D-KkEcmPwTXXnCYkSbvKlqCBYDZMBgzNQvRz9ydgygOVEX8RcRigEjtAIYD4vquok1aq3SmHm_4ZNuOyux82sZt6HiucBJCWzZhWJ1t5sEeMuQaWB2hDxQEu8HbS-xRYl4df94BP_vJM-v-FfKCJ3x-QZaY6Srmu9m8hzZWGfG-U7jbBDxDV1RFMyD6506i0B1Z-cTrBBSY4q0V4Ke6JF7LYzX_sm3KoV6NOEjGqKtNqWwOOfCXfdwgsBV3GUCZCRDBdBXQSACBN8cUl5syalP9tIIuZ4Zzzcxff-4WzuEWwkQL5gYSX5bESG59NmEDFyGI7dmZXt9ytHOsQZGy0bOgRJkNtqAID1F-0TXduMr0pJzszRtVawqqrVWQ2oS2UvI8JKzv4F5c7m9A6l3G9i3CnWT5wgN8QLNsh0D7PlrmRQQl5P8D4WjxfHsvyKn7cp4oH605Rupbx6UG-TsFR4RoNQQ4xJW6zeNnIEOtPTFftJNNIxQnt4JDh2v8fd5hbg0MkDHjt-nflVvf53KfPnLR_gSqvyBZzmKXWAz8zbH_ISWLY7cywvmzA5qYtdr-UDetU7-KEwiSbVZH-FY4GYBlcDR4C35nC9CO1z_e8x-0p4WBjvDNYO7Q3UWt7U8EsnAXHGIKcNWO38zFJo0VHqgUCW7zBtwiPCAA5o"

Vue.use(VueEvents)
Vue.component('custom-actions', CustomActions)
Vue.component('my-detail-row', DetailRow)
Vue.component('filter-bar', FilterBar)
var userList = []
var checkOutID = ''
var selected = null
export default {
  components: {
    vSelect,
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
  },
  data () {
    return {
      // userList: [],
      checkOutID: '',
      selected: null,
        options: [],
      fields: [
        {name: 'id',
        sortField: 'id',
        visible: false },
        // {
        //   name: '__sequence',
        //   title: '#',
        //   titleClass: 'text-right',
        //   dataClass: 'text-right'
        // },
        {
          name: '__checkbox',
          titleClass: 'text-center',
          dataClass: 'text-center',
        },
        {
          name: 'asset_tag',
          sortField: 'asset_tag',
          // callback: 'linkFormatter'
        },
            
              {
                title: 'Serial',
          name: 'serial',
          sortField: 'serial',
        },
                   {
                     title: 'Model',
          name: 'model.name',
          sortField: 'model.name',
        },           {
          title: 'Category',
          name: 'category.name',
          sortField: 'category.name',
        },           {
          title: 'Status',
          name: 'status_label.name',
          sortField: 'status_label.name',
        },  
         {
          title: 'Assigned To',
          name: 'assigned_to.name',
          sortField: 'assigned_to.name',
        },  
                  {
          title: 'Location',
          name: 'location.name',
          sortField: 'location.name',
        }, 
        //         {
        //   title: 'Checkin/Checkout',
        //   name: 'status_label',
        //    callback: 'checkincheckout'
        // },
        {
          name: '__slot:actions', 
          title: 'Actions2',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        },

                {
          name: '__component:custom-actions',
          title: 'Actions',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
        },
      ],
      css: {
        table: {
          tableClass: 'table table-bordered table-striped table-hover',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down'
        },
        pagination: {
          wrapperClass: 'pagination',
          activeClass: 'active',
          disabledClass: 'disabled',
          pageClass: 'page',
          linkClass: 'link',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: '',
          },
        },
        icons: {
          first: 'glyphicon glyphicon-step-backward',
          prev: 'glyphicon glyphicon-chevron-left',
          next: 'glyphicon glyphicon-chevron-right',
          last: 'glyphicon glyphicon-step-forward',
        },
      },
      httpoptions: { headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
    }},
      sortOrder: [
        { field: 'email', sortField: 'email', direction: 'asc'}
      ],
      
    }
  },
  created () {
    this.$snipeit
      .get("users")
      .then(response => {
        // console.log(response.data.rows)
        // this.userList = response.data.rows
        for (var user of response.data.rows) {
          var item = {}
          ;(item.label = user.name), (item.value = user.id)
          this.options.push(item)
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {
//     onChange(val){
// console.log(val)
//     },
    checkoutAsset(val){
      console.log(this.$refs.vuetable)
      this.checkOutID = val

    },
      onAction2 () {
      console.log(this.selected)
      console.log(this.checkOutID)
 this.$snipeit.post(
          "hardware/" +
            this.checkOutID +
            "/checkout?assigned_user=" +
            this.selected.value +
            "&assigned_asset=" +
            this.checkOutID  +
            "&checkout_to_type=user")
        .then(response => {
          console.log(response)
          this.selected = null
          this.$refs.vuetable.refresh()
          
        })
        .catch(e => {
      console.log(e)
        })
      },    
      onAction (val) {
      console.log('slot) action: ', val)
      this.checkOutID = val.rowData.id
      console.log(val.rowData.assigned_to)
      if(val.rowData.assigned_to)
        this.$snipeit
        .post("hardware/" + val.rowData.id + "/checkin")
        .then(response => {
          console.log(response)
          this.$refs.vuetable.refresh()
        })
        .catch(e => {
      console.log(e)
        })
      // if(!data.assigned_to)
      // this.$nextTick(() => {
      
      //   // this.$refs.modal.open(data.id)
      // })
        
      
    },
     genericRowLinkFormatter(value) {
            if (value) {
                return '<a href="http://ramnode1.ashdevtools.com:8080/hardware/' + row.id + '"> ' + value + '</a>';
            }
    },
    linkFormatter (value){
      console.log(value)
      return '<a href="http://ramnode1.ashdevtools.com:8080/hardware/' + value.id + '" data-tooltip="true" title="' + value.type + '"> ' + value.name + '</a>'
    },
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="label label-success"><i class="glyphicon glyphicon-star"></i> Male</span>'
        : '<span class="label label-danger"><i class="glyphicon glyphicon-heart"></i> Female</span>'
    },
    formatNumber (value) {
      return accounting.formatNumber(value, 2)
    },
    formatDate (value, fmt = 'D MMM YYYY') {
      return (value == null)
        ? ''
        : moment(value, 'YYYY-MM-DD').format(fmt)
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onCellClicked (data, field, event) {
       console.log('cellClicked: ', data.id)
       console.log(data)
       console.log(field)
       console.log(event)
      //  this.$refs.vuetable.toggleDetailRow(data.id)
      if(field.name == 'asset_tag')
        window.location.href = "http://localhost:8081/asset_detail/"+data.id
        console.log('hit')
        return '<a href="http://ramnode1.ashdevtools.com:8080/hardware/' + field.name + '" data-tooltip="true" title="' + field.name + '"> ' + field.name + '</a>'
      
    },
  },
  events: {
    'filter-set' (filterText) {
      this.moreParams = {
        filter: filterText
      }         
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    },
    'filter-reset' () {
      this.moreParams = {}
      Vue.nextTick( () => this.$refs.vuetable.refresh() )
    }
  }
}
</script>
<style>
.pagination {
  margin: 0;
  float: right;
}
.pagination a.page {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 2px;
}
.pagination a.page.active {
  color: white;
  background-color: #337ab7;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 10px;
  margin-right: 2px;
}
.pagination a.btn-nav {
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 2px;
}
.pagination a.btn-nav.disabled {
  color: lightgray;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px 7px;
  margin-right: 2px;
  cursor: not-allowed;
}
.pagination-info {
  float: left;
}
</style>