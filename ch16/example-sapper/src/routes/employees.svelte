<script context="module">
  export async function preload(page, session) {
    try {
      // This is a free, public API service that returns fake employee data.
      const url = 'http://dummy.restapiexample.com/api/v1/employees';
      // Note the use of this.fetch instead of fetch.
      const res = await this.fetch(url);
      if (res.ok) {
        const result = await res.json();
        /*
          The API service returns a JSON object with a data property whose value
          is an array of employee objects.
        */
        const employees = result.data;

        // Sort the employees on their last name, then first name.
        employees.sort((emp1, emp2) => {
          const [first1, last1] = emp1.employee_name.split(' ');
          const [first2, last2] = emp2.employee_name.split(' ');
          const compare = last1.localeCompare(last2);
          return compare ? compare : first1.localeCompare(first2);
        });

        // The object returned provides prop values to the component.
        return { employees };
      } else {
        const msg = await res.text();
        this.error(res.statusCode, 'employees preload error: ' + msg);
      }
    } catch (e) {
      // Note the way errors are handle
      this.error(500, 'employees preload error: ' + e.message);
    }
  }
</script>

<script>
  export let employees;

  /*
    This formats a number as US currency and only includes cents when they are
    not zero.
  */
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
</script>

<svelte:head>
  <title>Employees</title>
</svelte:head>

<table>
  <caption>Employees</caption>
  <tr>
    <th>Name</th>
    <th>Age</th>
    <th>Salary</th>
  </tr>
  {#each employees as employee}
    <tr>
      <td>{employee.employee_name}</td>
      <td class="right">{employee.employee_age}</td>
      <td class="right">{formatter.format(employee.employee_salary)}</td>
    </tr><tr />{/each}
</table>

<style>
  caption {
    font-size: 2rem;
    font-weight: bold;
  }

  table {
    border-collapse: collapse;
  }

  td,
  th {
    border: solid lightgray 1px;
    padding: 0.5rem;
  }

  .right {
    text-align: right;
  }
</style>
