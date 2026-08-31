function StatCard({

title,

value,

icon,

color

}){

return(

<div className={`stat-card bg-${color}`}>

<div>

<h5>

{title}

</h5>

<h2>

{value}

</h2>

</div>

<div className="stat-icon">

{icon}

</div>

</div>

);

}

export default StatCard;