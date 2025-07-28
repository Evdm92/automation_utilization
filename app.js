let automationEntries = [];
let strapperEntries = [];

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (user === "admin" && pass === "admin") {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-screen').style.display = 'block';
  } else {
    alert("Incorrect login");
  }
}

function showTab(tab) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(tab).style.display = 'block';
}

function saveAutomation() {
  const weights = {
    A02D: 2.1, A07D: 7.5, E10D: 10.5,
    A11D: 11.5, E15D: 15.7, A15C: 15.8
  };
  const capacities = {
    A02D: 300, A07D: 300, A11D: 300,
    E15D: 300, A15C: 216, E10D: 200
  };
  const cartonType = document.getElementById('carton-type').value;
  const cartons = parseFloat(document.getElementById('cartons-produced').value);
  const packers = parseFloat(document.getElementById('packers').value);
  const bins = parseFloat(document.getElementById('bins-tipped').value);
  const binWeight = parseFloat(document.getElementById('avg-bin-weight').value);
  const utilization = ((cartons / capacities[cartonType]) * 100).toFixed(2);
  const perPacker = (cartons / packers).toFixed(2);
  const fruitAllocation = (((cartons * weights[cartonType]) / (bins * binWeight)) * 100).toFixed(2);

  automationEntries.push({
    time: document.getElementById('auto-date').value,
    machine: document.getElementById('machine-number').value,
    cartonType, cartons, packers,
    inventory: document.getElementById('inventory-type').value,
    status: document.getElementById('machine-status').value,
    bins, binWeight,
    utilization, perPacker, fruitAllocation
  });
  alert("Saved automation entry.");
}

function saveStrapper() {
  strapperEntries.push({
    time: document.getElementById('strap-date').value,
    strap1: document.getElementById('strap1').value,
    strap1Status: document.getElementById('strap1-status').value,
    strap2: document.getElementById('strap2').value,
    strap2Status: document.getElementById('strap2-status').value,
    manual: document.getElementById('manual-strap').value
  });
  alert("Saved strapper entry.");
}

function generateReport() {
  let output = "<h3>Automation Entries:</h3>";
  automationEntries.forEach(e => {
    const warnUtil = e.utilization < 50 ? 'style="color:red;"' : '';
    const warnPack = e.perPacker < 11 ? 'style="color:red;"' : '';
    output += `<div><b>${e.time} - Machine ${e.machine}</b><br/>
      Cartons: ${e.cartons}, Packers: ${e.packers}, 
      <span ${warnUtil}>Utilization: ${e.utilization}%</span>, 
      <span ${warnPack}>Per Packer: ${e.perPacker}</span>, 
      Fruit Allocation: ${e.fruitAllocation}%</div><hr/>`;
  });

  output += "<h3>Strapper Entries:</h3>";
  strapperEntries.forEach(e => {
    output += `<div><b>${e.time}</b><br/>
      Auto1: ${e.strap1} (${e.strap1Status}), 
      Auto2: ${e.strap2} (${e.strap2Status}), 
      Manual: ${e.manual}</div><hr/>`;
  });

  document.getElementById("report-output").innerHTML = output;
}
