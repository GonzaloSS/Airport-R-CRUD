package com.example.airport

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.airport.models.Airport


class AirportAdapter(var airportList: ArrayList<Airport>, val context: Context) : RecyclerView.Adapter<AirportAdapter.ViewHolder>() {


    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val v = LayoutInflater.from(parent.context).inflate(R.layout.airport_list_row, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bindView(airportList[position], context)
    }

    override fun getItemCount(): Int {
        return airportList.size;
    }

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bindView(a: Airport, context: Context){
            val txt_name: TextView = itemView.findViewById(R.id.textViewName)
            val txt_postal: TextView = itemView.findViewById(R.id.textViewPostal)
            val txt_initial: TextView = itemView.findViewById(R.id.textViewInitial)
            val txt_age: TextView = itemView.findViewById(R.id.textViewAge)

            txt_name.text = a.name
            txt_postal.text = a.postal
            txt_initial.text = a.initial
            txt_age.text = a.age


        }
    }
}