<template>
  <q-page padding class="row justify-center">

    <
  <q-table
    ref="table"
    :data="serverData"
    :columns="columns"
    :filter="filter"
    row-key="name"
    :pagination.sync="serverPagination"
    :loading="loading"
    @request="request"
  >  
  <qr>

  </qr>
   
  </q-table>
</template>
		