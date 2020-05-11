<?php

    session_start();
    if(isset($_SESSION['login'])){
	//if it is, then preoceed to the following
	$id_peminjam = $_POST['id_2'];
    
    require_once('../config/connection.php');
	$sql = "SELECT * FROM ruangan r, peminjam p, details_peminjaman_ruangan x WHERE r.kode = x.id_ruangan AND p.id_peminjam = x.id_peminjam AND x.id_peminjam = '$id_peminjam'";
		//var_dump($sql);
	$result = mysqli_query($connection, $sql);
		//var_dump($result);
		//var_dump($connection);
	if($result){
		$count = mysqli_num_rows($result);		
	}else{
		die("Maaf, tidak ditemukan data yang cocok.");
	}
?>
		<div class="well well-lg">
			<table class="table table-hover table-bordered">
				<tr>
					<th>No.</th>
					<th>ID Peminjaman Ruangan</th>
					<th>ID Ruangan</th>
					<th>Nama Ruangan</th>
					<th>Tanggal pemakaian</th>
					<th>Tanggal selesai</th>
					<th>Keterangan</th>
					<th>Action</th>
				</tr>
<?php
		$count =0;
		if($count>0){
		$number = 1;	
			
			echo "<p>$count Ruangan telah dipinjam oleh anggota bernomor $id_peminjam.<p>";
			
		 	while($row = mysqli_fetch_assoc($result)) {
		 		if(!isset($row["kembali"])){
		 			$status = "belum kembali";
		 			//$buttonStatus is to decide whether the button is clickable or not
		 			//it is clickable if the book is not yet returned
		 			$buttonStatus = "active";
		         }else{
		         	$status = "dikembalikan ".$row["kembali"];
		         	//it is unclickable if the book is already returned
		         	$buttonStatus = "disabled";
		         }

		 		$id = $row["id_peminjaman_ruangan"];
		 		echo "<tr> <td>" . $number. "</td><td> " . 
		 		 $row["id_peminjaman_ruangan"]."</td><td>".
		         $row["id_ruangan"]."</td><td>".
		         $row["nama_ruangan"]. "</td><td> " .
		         $row["tanggal_pemakaian"]. "</td><td> " . 
		         $row["tanggal_selesai"]. "</td><td> " .
		         $status. "</td><td> ".
		         //buttonStatus is used here as a parameter if the button is clickable or not
		         "<a href='kembali-page-ruangan.php?id=$id' role='button' class='btn btn-primary $buttonStatus btn-sm'>Kembalikan</a></td></tr>";
		 		$number++;
		 	}
			
		 }
	}
		
?>
			</table>
		</div>