package com.example.airport

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.toolbox.JsonArrayRequest

import com.android.volley.toolbox.Volley
import com.example.airport.models.Airport
import org.json.JSONException

class AirportListActivity : AppCompatActivity() {
    private lateinit var airports: ArrayList<Airport>
    private lateinit var recyclerView: RecyclerView
    private lateinit var viewAdapter: AirportAdapter
    private lateinit var viewManager: RecyclerView.LayoutManager
    private lateinit var requestQueue: RequestQueue

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_airport_list)

        requestQueue = Volley.newRequestQueue(this)

        airports = ArrayList<Airport>()

        viewManager = LinearLayoutManager(this)

        viewAdapter = AirportAdapter(airports, this)


        recyclerView = findViewById<RecyclerView>(R.id.recyclerViewAirport)
        // use a linear layout manager
        recyclerView.layoutManager = viewManager

        // specify an viewAdapter (see also next example)
        recyclerView.adapter = viewAdapter

        getAllAirports()

    }

    private fun getAllAirports() {

        val url = "http://192.168.0.21:8080/api/airport"
        val request =
                JsonArrayRequest(Request.Method.GET, url, null, { response ->
                    try {
                        for (i in 0 until response.length()) {
                            val bicycle = response.getJSONObject(i)
                            val id = bicycle.getInt("id")
                            val name = bicycle.getString("name")
                            val postal = bicycle.getString("postal")
                            val initial = bicycle.getString("initial")
                            val age = bicycle.getString("age")
                            airports.add(Airport(id, name, postal, initial, age))
                        }
                        viewAdapter.airportList = airports
                        viewAdapter.notifyDataSetChanged()
                    } catch (e: JSONException) {
                        e.printStackTrace()
                    }
                }, { error -> error.printStackTrace() })
        requestQueue?.add(request)
    }
}

